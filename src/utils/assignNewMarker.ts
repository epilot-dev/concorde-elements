async function importMarkerLibrary(): Promise<
  typeof google.maps.marker.AdvancedMarkerElement
> {
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    'marker'
  )) as google.maps.MarkerLibrary

  return AdvancedMarkerElement
}

export const assignNewMarker = ({
  pinRef,
  coordinates,
  map
}: {
  pinRef: React.MutableRefObject<google.maps.marker.AdvancedMarkerElement | null>
  coordinates: google.maps.LatLng | google.maps.LatLngLiteral
  map: google.maps.Map
}) => {
  importMarkerLibrary().then((AdvancedMarkerElement) => {
    if (pinRef.current) {
      pinRef.current.position = coordinates
    } else {
      pinRef.current = new AdvancedMarkerElement({
        position: coordinates,
        map: map
      })
    }
  })
}
