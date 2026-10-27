# decent.music

An interactive globe for discovering leading concert venues around the world.

## Local development

```sh
npm install
npm run dev
```

The map uses MapLibre GL JS with an OpenFreeMap style. Set
`VITE_MAP_STYLE_URL` to use a different MapLibre-compatible style.

Venue data is loaded from `public/data/venues.geojson`.
