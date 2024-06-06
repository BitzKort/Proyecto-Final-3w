import { useContext, useEffect, useState, useRef } from 'react'
import {
  MapContainer,
  TileLayer
} from "react-leaflet";
import ButtonAddEventAndPlace from "./ButtonAddEventsAndPlaces/ButtonAddEventAndPlace"
import MarkersComponent from './MarkersComponent';
import EventsAndPlaces from './EventsAndPlaces'
// import { EventsContext } from './Events/EventsProvider'
import { PlacesContext } from './Places/PlacesProvider'
import { UserDataContext } from "../Profile/UserDataProvider";
import defaultLocations from '../../utils/City/defaultLocations.js'

// Ubicaciones predeterminadas de acuerdo a la ciudad para centrar el mapa


export default function Dashboard() {
  // const { fetchEvents } = useContext(EventsContext)
  const { fetchPlaces } = useContext(PlacesContext)

  // Datos del usuario para sacar la ciudad
  const { userData } = useContext(UserDataContext)

  // Ubicación inicial del mapa
  const [userLocation, setUserLocation] = useState(null)

  // Estado para determinar si se hizo click en el botón agregar
  const [isToggled, setIsToggled] = useState(false);

  // Estado para verificar si se puede hacer click en el mapa para agregar un marcador
  const [isToggledMarker, setIsToggledMarker] = useState(false);

  // Nombre de lugar obtenido de la api de OpenStreetMap
  const [placeName, setPlaceName] = useState('')

  // Guardar la ubicacion de un lugar temporalmente mientras se crea
  const [markerAux, setMarkerAux] = useState(null)

  // Instancia del mapa
  const mapRef = useRef(null)

  // Instancias de los marcadores
  const markerRefs = useRef({});

  useEffect(() => {
    // fetchEvents()
    fetchPlaces()
  }, [])

  useEffect(() => {
    if (userData && !userData.ciudad) {
      window.location.href = '/profile/config'
    } else if (userData) {
      setUserLocation({
        coordinates: defaultLocations(userData.ciudad.codigo_ciudad).coordinates,
        zoom: defaultLocations(userData.ciudad.codigo_ciudad).zoom
      })
    }
  }, [userData]);

  return (
    <div className="flex flex-col lg:flex-row w-full p-0 h-full mx-auto">

      {/* Contenedor principal del mapa */}
      <div className="lg:basis-[70%] relative">
        {userLocation && (
          <MapContainer
            key={`${userLocation.coordinates[0]}-${userLocation.coordinates[1]}-${userLocation.zoom}`}
            ref={mapRef}
            center={userLocation.coordinates}
            zoom={userLocation.zoom}
            scrollWheelZoom={false}
            className="h-[63vh] lg:h-[89vh] shadow-[10px_10px_22px_-13px_rgba(0,0,0,0.4)]"
          >

            <MarkersComponent
              isToggledMarker={isToggledMarker}
              setIsToggledMarker={setIsToggledMarker}
              markerAux={markerAux}
              setMarkerAux={setMarkerAux}
              setPlaceName={setPlaceName}
              markerRefs={markerRefs} />

            {/* Atribución */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
          </MapContainer>)}
        <ButtonAddEventAndPlace
          isToggled={isToggled}
          setIsToggled={setIsToggled}
          isToggledMarker={isToggledMarker}
          setIsToggledMarker={setIsToggledMarker}
          placeName={placeName}
          setPlaceName={setPlaceName}
          markerAux={markerAux}
          setMarkerAux={setMarkerAux}
          mapRef={mapRef} />
      </div>
      <EventsAndPlaces mapRef={mapRef} markerRefs={markerRefs} />
    </div>
  )
}