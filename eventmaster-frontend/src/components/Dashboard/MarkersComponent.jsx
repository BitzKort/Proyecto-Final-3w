/* eslint-disable react/prop-types */
import { useContext } from "react";
import {
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { getPlaceName } from "../../utils/placeName.js";

import { PlacesContext } from "./Places/PlacesProvider.jsx"
import location from '../../assets/location.svg'
import newLocation from '../../assets/new-location.svg'


export default function MapView({ isToggledMarker, setIsToggledMarker, markerAux, setMarkerAux, setPlaceName, markerRefs }) {

  // Lugares
  const { places } = useContext(PlacesContext)

  return (
    <>
      {places &&
        places.map((place) => (
          <Marker
            key={place.codigo_lugar}
            ref={(ref) => markerRefs.current[place.codigo_lugar] = ref}
            position={JSON.parse(place.ubicacion)}
            // eslint-disable-next-line no-undef
            icon={L.icon({
              iconUrl: location,
              iconSize: [42, 42],
            })}
          // eventHandlers={{
          //   click: () => {
          //     onclick = {  }
          //   },
          // }}
          >
            <Popup >
              <div className="h-auto z-50 max-w-[300px]">
                <h1 className="text-lg font-bold text-center mt-4">
                  {place.nombre}
                </h1>
                <p className="text-sm text-center">{place.descripcion}</p>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* Pintar temporalmente un marcador cuando se crea un lugar */}
      {markerAux &&
        <Marker
          key={'marker-aux'}
          position={markerAux}
          // eslint-disable-next-line no-undef
          icon={L.icon({
            iconUrl: newLocation,
            iconSize: [42, 42],
          })}>
        </Marker>}

      {/* Posición inicial en el mapa */}
      {/* <Circle center={[4.074862, -76.192516]} radius={20} /> */}

      {/* Componente para añadir un lugar en una ubicación donde el usuario dé click */}
      {
        isToggledMarker && (
          <AddMarker
            isToggledMarker={isToggledMarker}
            setIsToggledMarker={setIsToggledMarker}
            setPlaceName={setPlaceName}
            setMarkerAux={setMarkerAux}
          />
        )
      }

    </>
  )
}



function AddMarker({
  isToggledMarker,
  setIsToggledMarker,
  setPlaceName,
  setMarkerAux,
}) {

  useMapEvents({
    click: async (e) => {
      if (isToggledMarker) {
        const coord = [e.latlng.lat, e.latlng.lng];
        setMarkerAux(coord)
        setIsToggledMarker(false);
        const placeName = await getPlaceName(e.latlng.lat, e.latlng.lng);
        setPlaceName(placeName);
      }
    },
  });
}
