import { useState, useEffect, createContext } from "react";
import fetchPlacesFromDB from "../../../utils/Places/fetchPlacesFromDB";

const PlacesContext = createContext()

function PlacesProvider({ children }) {

  // Estado para almacenar los lugares
  const [places, setPlaces] = useState(null)

  //Traer los lugares de la misma ciudad desde la BD
  async function fetchPlaces() {
    const places = await fetchPlacesFromDB()
    setPlaces(places)
  }

  // Ejecutar fetchPlaces() al cargar el componente
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchPlaces()
    }
  }, [])

  return (
    <PlacesContext.Provider value={{ places, fetchPlaces }}>
      {children}
    </PlacesContext.Provider>
  )
}

export { PlacesContext, PlacesProvider }