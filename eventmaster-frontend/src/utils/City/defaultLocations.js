const locations = {
  111: {
    coordinates: [4.0864122, -76.1909629],
    zoom: 14
  },
  222: {
    coordinates: [3.4277632, -76.5171433],
    zoom: 13
  }
}

export default function defaultLocations(codigo_ciudad) {

  return locations[codigo_ciudad]
}