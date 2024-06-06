/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { PlacesContext } from "./PlacesProvider";
import PlaceDetails from "./PlaceDetails";
import { location } from "../../../utils/svgs";
import defaultPlace from '../../../assets/default-place.png'
import { UserDataContext } from "../../Profile/UserDataProvider";

async function fetchImage(url) {
  if (!url.includes('null')) {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
  return defaultPlace

}

export default function PlacesList({ mapRef, markerRefs }) {

  // Lista de lugares
  const { places } = useContext(PlacesContext);

  // Mostrar detalles del lugar
  const [selectedPlace, setSelectedPlace] = useState(null);

  function handleShowPlaceDetails(place) {
    setSelectedPlace(place);
  }

  return places ? (
    <>
      <div className="relative flex flex-col items-center text-sm lg:px-0 overflow-hidden mt-[10px]">
        <ul
          className="w-full sm:grid sm:grid-cols-2 sm:gap-x-3 lg:block overflow-y-auto h-auto px-2"
          id="place-list"
        >
          {/* Iterar sobre la lista de lugares */}
          {places.map((lugar) => (
            <PlaceItem
              key={lugar.codigo_lugar}
              lugar={lugar}
              handleShowPlaceDetails={handleShowPlaceDetails}
              mapRef={mapRef}
              markerRefs={markerRefs}
            />
          ))}
        </ul>
      </div>
      {/* Detalles del evento al hacer click sobre uno */}
      <PlaceDetails
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
      />
    </>
  ) : (
    <div className="flex-grow flex flex-col items-center justify-center text-[30px] min-h-[150px] text-sm">
      <p className="text-center">No hay lugares para mostrar</p>
    </div>
  );
}


// Componente para mostrar cada lugar en la lista
function PlaceItem({ lugar, handleShowPlaceDetails, mapRef, markerRefs }) {

  const { userData } = useContext(UserDataContext)

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (lugar) {
      const ruta = lugar.foto
      const imageUrl = `http://localhost:5000/${ruta}`;

      fetchImage(imageUrl)
        .then((url) => setImageSrc(url))
        ;
    }
  }, [lugar]);

  if (!lugar) {
    return null;
  }

  return (
    <li className="box-border text-gray-800 hover:border-indigo-500 border-[2px] overflow-hidden rounded-[20px] border-gray-300 my-3 lg:mx-1 relative h-[170px]">

      {/* Indicador si es creador del lugar */}
      {userData && (lugar.creador === userData.id && (
        <span className="z-10 absolute top-0 left-0 px-2 rounded-br-md bg-indigo-500 text-white">
          P
        </span>
      ))
      }

      {/* Foto del lugar */}
      <div className="basis-[40%] object-cover absolute top-0 bottom-0">
        {imageSrc && (
          <img
            src={imageSrc}
            alt=""
            className="h-full hover:cursor-pointer"
            onClick={() => handleShowPlaceDetails(lugar)}
          />
        )}
      </div>


      {/* Resumen del lugar */}
      <div className="bg-white flex flex-col justify-center z-[1] h-full w-[60%] absolute right-0">

        {/* Nombre del lugar */}
        <p className={`text-base font-bold text-center col-span-2 mb-2 hover:cursor-pointer hover:underline line-clamp-1`} onClick={() => handleShowPlaceDetails(lugar)}>
          {`${lugar.nombre}`}
        </p>

        {/* Dirección del lugar */}
        <p className="text-center flex items-center justify-center mx-3 max-h-[50px] overflow-hidden gap-1">
          <span >{location(22)}</span>
          <span className="h-full px-1 line-clamp-2 self-start">{lugar.direccion}</span>
        </p>

        <div className="flex justify-around gap-2 px-1">
          {/* Aforo */}
          <p className="text-center self-center"><span className="font-semibold">Aforo:</span> {lugar.aforo}</p>
          {/* Botón ver en el mapa */}
          <button className="underline my-2 hover:text-indigo-500 p-0" onClick={() => {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            mapRef.current.flyTo(JSON.parse(lugar.ubicacion), 17, {
              duration: 1, // Duración de la animación en segundos
              easeLinearity: 0.1, // Suavidad de la animación (0 a 1)
            });
            markerRefs.current[lugar.codigo_lugar].openPopup()
          }}>
            Ver en el mapa
          </button>
        </div>
      </div>
    </li>
  );
}