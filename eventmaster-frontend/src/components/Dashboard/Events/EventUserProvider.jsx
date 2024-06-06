import { createContext, useState, useEffect } from "react"
import fetchEventUser from "../../../utils/Events/fetchEventUser"

// Creación del contexto
const EventUserContext = createContext()


function EventUserProvider({ children }) {

  const [event, setEvent] = useState(null)  
  const [user, setUser] = useState(null)
  // Estado para guardar la información del usuario
  const [userData, setUserData] = useState(null)

  // Consultar la información del usuario en la bd 
  async function getEventUserDataFromDB() {
    const response = await fetchEventUser(event);
    if (response) {
      const findUser = response.data.rows.find(
        (row) => row.nickname === user
      );
      if(findUser){
        setUserData(findUser);
      localStorage.setItem(
        "eventUserProfilePicture",
        findUser.foto
          ? findUser.foto
          : "https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif"
      );
      }
      
    }
  }

  // Ejecutar la función al cargar el componente
  useEffect(() => {
    getEventUserDataFromDB()
  }, [])

  return (
    <EventUserContext.Provider value={{ userData, getEventUserDataFromDB, setUser, setEvent }}>
      {children}
    </EventUserContext.Provider>
  )
}

export { EventUserContext, EventUserProvider }