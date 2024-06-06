/* eslint-disable react/prop-types */
import { useState } from "react";
import EventsList from "./Events/EventsList";
import PlacesList from "./Places/PlacesList";
import EventsFilters from "./Events/EventsFilters";

export default function EventsAndPlaces({ mapRef, markerRefs }) {

  // Estados: 
  // Actividades en la ciudad (datos de la bd)
  // const [events, setEvents] = useState(null);

  // Pestaña activa (eventos o lugares)
  const [activeTab, setActiveTab] = useState('events')

  // Filtro activo
  const [activeFilter, setActiveFilter] = useState('todos')
  // Fin declaración estados


  return (
    // Card
    <div className="lg:basis-[30%] lg:pb-3 lg:h-[89vh] px-3 mx-3 mt-7 lg:mt-0 lg:pt-4 flex flex-col justify-start bg-transparent overflow-y-auto h-[480px]">

      {/* Contenedor de botones */}
      <div className="flex lg:w-full lg:mx-0 font-bold rounded-[14px] overflow-hidden text-sm h-[45px] flex-shrink-0">

        {/* Botón eventos */}
        <button className={`flex-grow border-b-gray-200 ${activeTab === 'events' ? 'bg-indigo-500 text-white' : 'bg-gray-200 '}`} onClick={() => setActiveTab('events')}>
          Eventos
        </button>

        {/* Botón lugares */}
        <button className={`flex-grow border-b-gray-200 ${activeTab === 'places' ? 'bg-indigo-500 text-white' : 'bg-gray-200 '}`} onClick={() => setActiveTab('places')}>
          Lugares
        </button>
      </div>

      {
        // Sección de lista de eventos / lista de lugares
        activeTab == 'events' ?
          <>
            {/* Controles de filtrado */}
            <EventsFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            {/* Contenedor eventos */}
            < EventsList activeFilter={activeFilter} />
          </>
          :
          <PlacesList mapRef={mapRef} markerRefs={markerRefs} />
      }
    </div >
  )

}

