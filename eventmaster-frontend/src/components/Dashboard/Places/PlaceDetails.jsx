/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import VentanaModal from "../../VentanaModal.jsx";
import obtenerListaEventos from "../../../utils/Places/obtenerListaEventos.js";
import { UserDataContext } from "../../Profile/UserDataProvider.jsx"
import { ellipsis } from "../../../utils/svgs";
import axios from "axios";
import { PlacesContext } from "./PlacesProvider.jsx";


export default function EventDetails({ selectedPlace, setSelectedPlace }) {

  // Datos del usuario para determinar si es el creador o no
  const { userData } = useContext(UserDataContext)

  // Datos de lugares
  const { fetchPlaces } = useContext(PlacesContext)

  // Estado para determinar si es el creador del lugar
  const [ownerMenu, setOwnerMenu] = useState(null)

  // Lista de eventos de un lugar
  const [listaEventos, setListaEventos] = useState(null);

  // Obtener lista de eventos de un lugar
  async function obtenerListaEventosLugar() {
    const listaEventos = await obtenerListaEventos(selectedPlace.codigo_lugar);
    setListaEventos(listaEventos.data.rows);
  }

  useEffect(() => {
    if (selectedPlace) {
      obtenerListaEventosLugar();
    }
    setOwnerMenu(false)
  }, [selectedPlace]);


  // Eliminar lugar
  async function deletePlace() {
    await axios.post('http://localhost:5000/api/lugar/eliminar', { codigo_lugar: selectedPlace.codigo_lugar }, {
      headers: {
        "Content-Type": 'application/json',
        Authorization: localStorage.getItem('token')
      }
    })
    await fetchPlaces()
    setSelectedPlace(false)
  }


  return (
    selectedPlace ?
      // Cuadro de diálogo modal
      <VentanaModal estado={selectedPlace} cambiarEstado={setSelectedPlace}>

        {userData && (
          userData.id === selectedPlace.creador &&
          /* Menú del creador del lugar */
          <span
            onClick={() => {
              setOwnerMenu(!ownerMenu);
            }}
            className="text-base font-bold absolute top-2 left-2 rounded-3xl cursor-pointer hover:scale-[0.8] hover:transition-all duration-500 p-1 hover:bg-indigo-400"
          >
            {ellipsis(26)}
          </span>
        )}

        {/* Opciones del menú del propietario */}
        {ownerMenu && (
          <div className="absolute top-7 left-4 z-50 mt-2 bg-white divide-y divide-gray-200 rounded-md shadow-lg overflow-hidden">
            <button
              className="block px-4 py-2 text-sm w-full text-gray-700 hover:bg-red-600 hover:duration-500 hover:text-white z-50"
              onClick={() => deletePlace()}
            >
              Eliminar
            </button>
          </div>
        )}

        {/* Contenido del lugar */}

        {/* Nombre del lugar */}
        <p className={`text-xl font-bold text-center col-span-2 mb-3 mt-7 cursor-text`}>
          {selectedPlace.nombre}
        </p>

        {/* Descripción del lugar */}
        <p className={`text-center resize-none overflow-y-scroll h-auto col-span-2 mb-3 px-3 cursor-text`}>
          {selectedPlace.descripcion}
        </p>

        {/* Dirección */}
        <p className={`text-center resize-none overflow-y-scroll h-auto col-span-2 mb-3 px-3 cursor-text`}>
          <span className="font-semibold">Dirección:</span> {selectedPlace.direccion}
        </p>

        {/* Aforo */}
        <p className={`text-center resize-none overflow-y-scroll h-auto col-span-2 mb-3 px-3 cursor-text`}>
          <span className="font-semibold">Aforo:</span> {selectedPlace.aforo}
        </p>

        {/* Ciudad */}
        <p className={`text-center resize-none overflow-y-scroll h-auto col-span-2 mb-3 px-3 cursor-text`}>
          <span className="font-semibold">Ciudad:</span> {selectedPlace.ciudad === '111' ? 'Tuluá' : 'Cali'}
        </p>

        {/* Lista de eventos */}
        <details className="block w-[240px] max-w-[240px] min-w-[150px] p-1 mt-5 mb-3 mx-auto border-[1px] border-indigo-500 rounded-lg col-span-2 cursor-pointer">
          <summary>Eventos en este lugar</summary>
          {listaEventos === null ? (
            <div>No hay eventos en este lugar</div>
          ) : (
            listaEventos.map((evento, index) => (
              <div key={index}>{evento.nombre}</div>
            ))
          )}
        </details>
      </VentanaModal>
      :
      null
  );
}
