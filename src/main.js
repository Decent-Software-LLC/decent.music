import { Map, NavigationControl, Popup, setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import "./styles.css";

setWorkerUrl(workerUrl);

const SOURCE_ID = "venues";
const INITIAL_VIEW = { center: [8, 18], zoom: 1.35, pitch: 0, bearing: 0 };
const mapStyle = import.meta.env.VITE_MAP_STYLE_URL || "https://tiles.openfreemap.org/styles/liberty";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let spinFrame;
let previousSpinTime;
let spinEnabled = !prefersReducedMotion;

const mapStatus = document.querySelector("#map-status");
const venueCount = document.querySelector("#venue-count");
const intro = document.querySelector("#map-intro");

const map = new Map({
  container: "map",
  style: mapStyle,
  ...INITIAL_VIEW,
  attributionControl: true,
  cooperativeGestures: true,
  maxPitch: 70,
});

map.addControl(new NavigationControl({ showCompass: true, visualizePitch: true }), "bottom-right");

map.on("style.load", () => {
  map.setProjection({ type: "globe" });
  map.setSky({
    "sky-color": "#1b1b1d",
    "horizon-color": "#1b1b1d",
    "fog-color": "#1b1b1d",
    "sky-horizon-blend": 0.08,
    "horizon-fog-blend": 0.08,
    "fog-ground-blend": 0.12,
  });

  for (const layer of map.getStyle().layers || []) {
    const isMapLabel = layer.type === "symbol";
    const isAdministrativeBorder =
      layer.type === "line" && /admin|boundary|border/i.test(layer.id);

    if (isMapLabel || isAdministrativeBorder) {
      map.setLayoutProperty(layer.id, "visibility", "none");
    }
  }
});

map.on("load", async () => {
  try {
    const response = await fetch("/data/venues.geojson");
    if (!response.ok) throw new Error(`Venue data returned ${response.status}`);

    const geojson = await response.json();
    venueCount.textContent = `${geojson.features.length} venues`;

    map.addSource(SOURCE_ID, {
      type: "geojson",
      data: geojson,
      cluster: true,
      clusterMaxZoom: 8,
      clusterRadius: 48,
    });

    map.addLayer({
      id: "venue-clusters",
      type: "circle",
      source: SOURCE_ID,
      filter: ["has", "point_count"],
      paint: {
        "circle-color": ["step", ["get", "point_count"], "#8fbcff", 20, "#5a9bfa", 50, "#3b86f6"],
        "circle-radius": ["step", ["get", "point_count"], 20, 20, 27, 50, 34],
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 2,
        "circle-opacity": 0.95,
      },
    });

    map.addLayer({
      id: "venue-cluster-count",
      type: "symbol",
      source: SOURCE_ID,
      filter: ["has", "point_count"],
      layout: { "text-field": ["get", "point_count_abbreviated"], "text-size": 13 },
      paint: { "text-color": "#231f20" },
    });

    map.addLayer({
      id: "venue-pins",
      type: "circle",
      source: SOURCE_ID,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#3b86f6",
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 5, 8, 9],
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 2,
      },
    });

    mapStatus.hidden = true;
    startGlobeSpin();
  } catch (error) {
    console.error(error);
    mapStatus.textContent = "Venue data could not be loaded. Please try again.";
    mapStatus.classList.add("map-status--error");
  }
});

for (const eventName of ["mousedown", "touchstart", "wheel"]) {
  map.on(eventName, stopGlobeSpin);
}

map.on("click", "venue-clusters", async (event) => {
  const feature = map.queryRenderedFeatures(event.point, { layers: ["venue-clusters"] })[0];
  if (!feature) return;
  const source = map.getSource(SOURCE_ID);
  const zoom = await source.getClusterExpansionZoom(feature.properties.cluster_id);
  map.easeTo({ center: feature.geometry.coordinates, zoom });
});

map.on("click", "venue-pins", (event) => {
  const feature = event.features?.[0];
  if (!feature) return;
  const properties = feature.properties;
  const popup = document.createElement("article");
  popup.className = "venue-popup";

  const heading = document.createElement("h2");
  heading.textContent = properties.name;
  popup.append(heading);

  const location = document.createElement("p");
  location.className = "venue-popup__location";
  location.textContent = `${properties.city}, ${properties.country}`;
  popup.append(location);

  const details = document.createElement("dl");
  addDetail(details, "Capacity", Number(properties.capacity).toLocaleString());
  addDetail(details, "Venue", titleCase(properties.venueType));
  addDetail(details, "Region", properties.continent);
  popup.append(details);

  if (isWebUrl(properties.officialVenueUrl)) {
    const link = document.createElement("a");
    link.href = properties.officialVenueUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Visit venue website";
    popup.append(link);
  }

  new Popup({ offset: 14, maxWidth: "320px" })
    .setLngLat(feature.geometry.coordinates)
    .setDOMContent(popup)
    .addTo(map);
});

for (const layer of ["venue-clusters", "venue-pins"]) {
  map.on("mouseenter", layer, () => { map.getCanvas().style.cursor = "pointer"; });
  map.on("mouseleave", layer, () => { map.getCanvas().style.cursor = ""; });
}

map.on("error", (event) => {
  if (!map.loaded()) {
    mapStatus.textContent = "The map could not be loaded. Please try again.";
    mapStatus.classList.add("map-status--error");
  }
  console.error(event.error);
});

document.querySelector("#reset-view").addEventListener("click", () => {
  stopGlobeSpin();
  spinEnabled = !prefersReducedMotion;
  previousSpinTime = undefined;
  map.flyTo({ ...INITIAL_VIEW, duration: 1200 });
  map.once("moveend", startGlobeSpin);
});

document.querySelector("#dismiss-intro").addEventListener("click", () => {
  intro.hidden = true;
  map.getCanvas().focus();
});

function addDetail(list, term, value) {
  const dt = document.createElement("dt");
  dt.textContent = term;
  const dd = document.createElement("dd");
  dd.textContent = value;
  list.append(dt, dd);
}

function titleCase(value = "") {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isWebUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function startGlobeSpin() {
  if (!spinEnabled || spinFrame) return;

  const spin = (time) => {
    if (!spinEnabled) {
      spinFrame = undefined;
      return;
    }

    if (previousSpinTime !== undefined) {
      const elapsedSeconds = Math.min((time - previousSpinTime) / 1000, 0.1);
      const center = map.getCenter();
      map.setCenter([center.lng + elapsedSeconds * 1.25, center.lat]);
    }

    previousSpinTime = time;
    spinFrame = window.requestAnimationFrame(spin);
  };

  spinFrame = window.requestAnimationFrame(spin);
}

function stopGlobeSpin() {
  spinEnabled = false;
  previousSpinTime = undefined;
  if (spinFrame) window.cancelAnimationFrame(spinFrame);
  spinFrame = undefined;
}
