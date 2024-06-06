import { useContext, useEffect, useRef, useState } from "react";
import { close, location } from "../../utils/svgs";
import EventDetails from "../Dashboard/Events/EventDetails";
import PlaceDetails from "../Dashboard/Places/PlaceDetails"
import fetchAllEventsFromDB from "../../utils/Events/fetchAllEventsFromDB";
import fetchAllPlacesFromDB from "../../utils/Events/fetchAllPlacesFromDB";

function NavbarSearch() {

  // Lista de lugares
  const [places, setPlaces] = useState(null)

  // Lista de eventos
  const [events, setEvents] = useState(null)

  async function fetchAll() {
    const allEvents = await fetchAllEventsFromDB()
    setEvents(allEvents)
    const allPlaces = await fetchAllPlacesFromDB()
    setPlaces(allPlaces)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  // Mostrar cuadro con resultados de la búsqueda
  const [searchDialog, setSearchDialog] = useState(false)

  // Mostrar detalles del evento o lugar seleccionados
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)

  return (
    <>
      <div className="flex flex-grow relative max-w-[550px] ml-1 ">
        <svg
          className="absolute self-center ml-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          id="busqueda-global"
          placeholder="Buscar..."
          className="px-10 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          onClick={(e) => {
            fetchAll()
            const listaEventosLugares = document.getElementById("lista-eventos-lugares")
            const campoBusqueda = e.target
            if (!campoBusqueda.value) {
              setSearchDialog(!searchDialog)
            } else {
              setSearchDialog(true)
            }
          }}
          // Función de búsqueda al escribir
          onKeyUp={(event) => {
            if (event.key === "Escape") {
              setSearchDialog(false)
            } else {
              const listaEventosLugares = document.getElementById("lista-eventos-lugares");
              setSearchDialog(true)
              const textSearch = event.target.value.toLowerCase();
              const eventsAndPlaces = listaEventosLugares.getElementsByTagName("li")
              for (let i = 0; i < eventsAndPlaces.length; i++) {
                if (eventsAndPlaces[i].textContent.toLowerCase().includes(textSearch)) {
                  eventsAndPlaces[i].style.display = "block";
                } else {
                  eventsAndPlaces[i].style.display = "none";
                }
              }
            }
          }}
        />
        {searchDialog &&
          <div
            className="absolute h-full top-0 right-[10px] flex items-center cursor-pointer opacity-70"
            onClick={() => {
              setSearchDialog(false)
              document.getElementById('lista-eventos-lugares').style.display = 'none'
            }}
          >
            {close(20)}
          </div>
        }

        {/* Lista de eventos y lugares */}
        {searchDialog && <ul
          id="lista-eventos-lugares"
          className="fixed md:absolute top-[74px] md:top-[120%] right-[2%] md:right-0 left-[2%] md:left-0 bg-white rounded-xl border-[1px] border-indigo-500 px-3 max-h-[300px] overflow-y-auto z-10 py-2"
        // ref={scrollableRef}
        // onScroll={(e) => handleScroll(e)}
        >
          <p className="font-semibold text-center text-gray-800 border-b-[1px] border-b-gray-800 mb-2 py-1">
            Eventos
          </p>
          {events && events.map((event) => (
            <li
              className="rounded-md hover:bg-indigo-100 cursor-pointer px-1 h-[40px]"
              key={event.codigo_evento}
              onClick={() => setSelectedEvent(event)}
            >
              {/* Contenedor flex */}
              <div className="h-full flex items-center">
                {/* Parte izquierda */}
                <div className="whitespace-nowrap overflow-x-hidden text-ellipsis flex-shrink-0 flex-grow relative">
                  <p className="opacity-0 absolute">{event.lugar.ciudad.nombre}</p>
                  <p className="inline ml-1 mr-2 px-[6px] rounded-md bg-red-500 text-white">
                    E
                  </p>
                  {event.nombre}
                </div>
                {/* Parte derecha */}
                <div className="flex-grow flex-shrink text-right line-clamp-1">
                  {location(20)}{event.lugar.nombre}
                </div>
              </div>
            </li>
          ))}

          <p className="font-semibold text-center text-gray-800 border-b-[1px] border-b-gray-800 mb-2 py-1">
            Lugares
          </p>

          {places && places.map((place) => (
            <li
              className="rounded-md hover:bg-indigo-100 cursor-pointer px-1 h-[40px]"
              key={place.codigo_lugar}
              onClick={() => setSelectedPlace(place)}
            >
              {/* Contenedor flex */}
              <div className="h-full flex items-center">
                {/* Parte izquierda */}
                <div className="whitespace-nowrap overflow-x-hidden text-ellipsis basis-[65%]">
                  <p className="inline ml-1 mr-2 px-[6px] rounded-md bg-[#098ad8] text-white">
                    L
                  </p>
                  {place.nombre}
                </div>
                {/* Parte derecha */}
                <div className="flex-grow text-right">
                  {location(20)}{place.ciudad.nombre}
                </div>
              </div>
            </li>
          ))}
        </ul>}
      </div>
      {selectedEvent && <EventDetails selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />}
      {selectedPlace && <PlaceDetails selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />}
    </>
  );
}

export default NavbarSearch;
