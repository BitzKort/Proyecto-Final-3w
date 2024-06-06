import { useState, createContext, useEffect } from "react";
import fetchEventsFromDB from "../../../utils/Events/fetchEventsFromDB"

const EventsContext = createContext()

function EventsProvider({ children }) {

  // Estado para almacenar los eventos
  const [events, setEvents] = useState(null)

  // Función para traer los eventos de la base de datos
  async function fetchEvents() {
    const eventsResponse = await fetchEventsFromDB()
    setEvents(eventsResponse)
  }

  // Traer los eventos de la bd al cargar el componente
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchEvents()
    }
  }, []);

  return (
    <EventsContext.Provider value={{ events, fetchEvents }}>
      {children}
    </EventsContext.Provider>
  )
}

export { EventsContext, EventsProvider }