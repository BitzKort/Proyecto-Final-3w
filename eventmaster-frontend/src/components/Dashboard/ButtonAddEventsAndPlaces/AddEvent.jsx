/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { EventsContext } from "../Events/EventsProvider";
import ConfirmacionEventoCreado from "../../VentanaModal";
import { PlacesContext } from "../Places/PlacesProvider";
import { location } from "../../../utils/svgs";
import fetchTematicasFromDB from "../../../utils/Events/fetchTematicasFromDB";

const AddEvent = ({ setIsToggled, mapRef }) => {
  // Lista de lugares para registrarlos en el evento
  const { places } = useContext(PlacesContext);

  // Lista de temáticas
  const [tematicas, setTematicas] = useState();

  // Importar la función para actualizar lista de eventos una vez creado
  const { fetchEvents } = useContext(EventsContext);

  // Estado para guardar el lugar seleccionado
  const [lugarSeleccionado, setLugarSeleccionado] = useState('')

  // Estado para guardar el lugar seleccionado
  const [tematicaSeleccionada, setTematicaSeleccionada] = useState('')

  // Variable para mostrar confirmación de evento creado en un
  const [confirmacionEventoCreado, setConfirmacionEventoCreado] =
    useState(false);

  async function getTematicas() {
    const listaTematicas = await fetchTematicasFromDB()
    setTematicas(listaTematicas)
  }

  useEffect(() => {
    getTematicas()
  }, [])

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (datosNuevoEvento) => {

    if (lugarSeleccionado) {
      datosNuevoEvento.lugar = lugarSeleccionado
      datosNuevoEvento.tematica = tematicaSeleccionada
      await axios
        .post("http://localhost:5000/api/evento/agregar", datosNuevoEvento, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(async (response) => {
          await fetchEvents();
          setConfirmacionEventoCreado(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      {confirmacionEventoCreado && (
        <ConfirmacionEventoCreado
          estado={confirmacionEventoCreado}
          cambiarEstado={setIsToggled}
        >
          <h1 className="text-center m-6 text-sm font-semibold">
            Evento creado satisfactoriamente
          </h1>
        </ConfirmacionEventoCreado>
      )}
      <div className="w-full px-3 mb-4 mt-3 items-center relative" onClick={(e) => {
        if (!['buscar', 'campo-lugar', 'lista-lugares'].includes(e.target.id)) {
          document.getElementById('lista-lugares').style.display = 'none'
        }
      }}>
        <div className="w-full items-center text-center justify-center pb-3">
          <h1 className="font-semibold text-indigo-700 text-base shadow-lg shadow-indigo-300 my-7 w-fit text-center mx-auto">
            Crear un evento
          </h1>
          {/* Inicio del formulario */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre del evento */}
            <label className="text-sm font-semibold px-1">
              Nombre del evento
            </label>
            <input
              className={`w-full px-4 py-2 mb-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 text-sm`}
              placeholder="Nombre del evento"
              {...register("nombre", {
                required: true,
              })}
            />

            {errors.nombre && <p className="mb-3">{errors.nombre.message} *</p>}
            {/* Descripción */}
            <label className="mb-2 text-sm font-semibold px-1">
              Descripción
            </label>
            <textarea
              type="text"
              placeholder="Descripcion del evento"
              rows={3}
              className="w-full mb-2 text-sm px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 resize-none"
              {...register("descripcion", {
                required: true,
              })}
            />
            {errors.descripcion?.type === "required" && (
              <p className="mb-3">Campo descripcion es requerido *</p>
            )}
            {/* Lugar y fecha */}
            <div className="flex flex-col min-[550px]:flex-row min-[550px]:items-center justify-between mb-2">
              {/* Lugar */}
              <div className="basis-[50%] min-[550px]:mr-2">
                <label className="text-sm font-semibold">Lugar</label>
                <div className="relative border-0 bg-transparent">

                  {/* Botón para desplegar la lista de lugares */}
                  <input
                    id="campo-lugar"
                    readOnly={true}
                    onKeyUp={(event) => {
                      if (event.key === "Escape") {
                        document.getElementById("lista-lugares").style.display =
                          "none";
                      }
                    }}
                    autoComplete="off"
                    onClick={() => {
                      const lista = document.getElementById("lista-lugares");
                      lista.style.display =
                        lista.style.display === "block" ? "none" : "block";
                    }}
                    placeholder="Selecciona un lugar ▼"
                    className="text-sm w-full px-4 py-2 rounded-lg border-2 border-gray-200 bg-white mr-2 focus:border-indigo-500 focus:border-2 outline-none cursor-pointer text-center placeholder:text-black"
                  // {...register("lugar", {
                  //   required: true,
                  // })}
                  />
                  {errors.lugar?.type === "required" && (
                    <p className="mb-3">Lugar requerido *</p>
                  )}

                  {/* Lista de lugares */}
                  <ul
                    id="lista-lugares"
                    className="hidden absolute top-[100%] right-0 left-0 bg-white rounded-lg border-[1px] border-indigo-500 px-3 max-h-[173px] overflow-y-auto z-10"
                  >
                    {/* Barra de búsqueda de lugares */}
                    <input
                      type="search"
                      placeholder="Buscar..."
                      id="buscar"
                      autoComplete="off"
                      className="mt-2 py-1 px-1 w-full text-sm outline-none border-b-[1px] focus:border-gray-500"

                      // Función de búsqueda al escribir
                      onKeyUp={(event) => {
                        // setTextoCampoLugar(event.target.value.toLowerCase())
                        if (event.key === "Escape") {
                          document.getElementById("lista-lugares").style.display =
                            "none";
                        } else {
                          const listaLugares =
                            document.getElementById("lista-lugares");
                          listaLugares.style.display = "block";
                          const textSearch = event.target.value.toLowerCase();
                          const places = listaLugares.getElementsByTagName("li");

                          for (let i = 0; i < places.length; i++) {
                            if (
                              places[i].textContent
                                .toLowerCase()
                                .includes(textSearch)
                            ) {
                              places[i].style.display = "block";
                            } else {
                              places[i].style.display = "none";
                            }
                          }
                        }
                      }}
                    />
                    {places.map((place) => (
                      <li
                        key={place.codigo_lugar}
                        className="rounded-md hover:bg-indigo-100 cursor-pointer px-1 h-[40px] text-left"
                        onClick={() => {
                          const lugar = document.getElementById("campo-lugar");
                          lugar.value = place.nombre;
                          setLugarSeleccionado(place.codigo_lugar)
                          mapRef.current.flyTo(JSON.parse(place.ubicacion), 15, {
                            duration: 1, // Duración de la animación en segundos
                            easeLinearity: 0.1, // Suavidad de la animación (0 a 1)
                          });
                          document.getElementById(
                            "lista-lugares"
                          ).style.display = "none";
                        }}
                      >
                        {/* Contenedor flex */}
                        <div className="h-full flex items-center">
                          {/* Parte izquierda */}
                          <div className="whitespace-nowrap overflow-x-hidden text-ellipsis">
                            {location(20)} {place.nombre}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Fecha */}
              <div className="mt-2 min-[550px]:mt-0 basis-[50%] min-[550px]:ml-2 flex-shrink">
                <label className="text-sm font-semibold px-1">Fecha</label>
                <input
                  className="w-full px-[6px] py-2 rounded-lg border-2 border-gray-200 text-sm focus:border-indigo-500"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("fecha", {
                    required: true,
                  })}
                />
                {errors.eventDate?.type === "required" && (
                  <p className="mb-3">Campo fecha es requerido *</p>
                )}
              </div>
            </div>
            {/* Hora de inicio y hora final */}
            <div className="flex items-center justify-between px-0">
              {/* Hora de inicio */}
              <div className="mr-2">
                <label className="mb-2 text-sm font-semibold">
                  Hora inicio
                </label>
                <input
                  type="text"
                  placeholder="Hora de inicio"
                  className="w-full px-4 py-2 text-center border border-gray-300 rounded-md focus:outline-none text-sm"
                  {...register("hora_inicio", {
                    required: true,
                    pattern: {
                      value: /([0-1]?[0-9]|2[0-3]):[0-5][0-9]/,
                      message: "Formato de hora de inicio no válido",
                    },
                  })}
                />
                {errors.hora_inicio?.type === "required" && (
                  <p>Campo hora inicio es requerido *</p>
                )}
              </div>
              {/* Hora final */}
              <div className="ml-2">
                <label className="mb-2 text-sm font-semibold px-1">
                  Hora final
                </label>
                <input
                  type="text"
                  placeholder="Hora final"
                  className="w-full px-4 py-2 text-center border border-gray-300 rounded-md focus:outline-none text-sm"
                  {...register("hora_final", {
                    required: true,
                    pattern: {
                      value: /([0-1]?[0-9]|2[0-3]):[0-5][0-9]/,
                      message: "Formato de hora de inicio no válido",
                    },
                  })}
                />
                {errors.hora_final?.type === "required" && (
                  <p>Campo hora inicio es requerido *</p>
                )}
              </div>
            </div>

            {/* Tematica */}
            <div className="basis-[50%] min-[550px]:mr-2">
              <label className="text-sm font-semibold">Temática</label>
              <div className="relative border-0 bg-transparent">

                {/* Botón para desplegar la lista de Temáticas */}
                <input
                  id="campo-tematicas"
                  readOnly={true}
                  onKeyUp={(event) => {
                    if (event.key === "Escape") {
                      document.getElementById("lista-tematicas").style.display =
                        "none";
                    }
                  }}
                  autoComplete="off"
                  onClick={() => {
                    const lista = document.getElementById("lista-tematicas");
                    lista.style.display =
                      lista.style.display === "block" ? "none" : "block";
                  }}
                  placeholder="Selecciona una tematica ▼"
                  className="text-sm w-full px-4 py-2 rounded-lg border-2 border-gray-200 bg-white mr-2 focus:border-indigo-500 focus:border-2 outline-none cursor-pointer text-center placeholder:text-black"
                // {...register("lugar", {
                //   required: true,
                // })}
                />
                {errors.tematica?.type === "required" && (
                  <p className="mb-3">Temática requerida *</p>
                )}

                {/* Lista de tematicas */}
                <ul
                  id="lista-tematicas"
                  className="hidden absolute top-[-400%] right-0 left-0 bg-white rounded-lg border-[1px] border-indigo-500 px-3 max-h-[173px] overflow-y-auto z-10"
                >
                  {tematicas && tematicas.map((tematica) => (
                    <li
                      key={tematica.codigo_tematica}
                      className="rounded-md hover:bg-indigo-100 cursor-pointer px-1 h-[40px] text-left"
                      onClick={() => {
                        const campoTematica = document.getElementById("campo-tematicas");
                        campoTematica.value = tematica.nombre;
                        setTematicaSeleccionada(tematica.codigo_tematica)
                        console.log(`Tematica seleccionada: ${tematicaSeleccionada}`)
                        document.getElementById(
                          "lista-tematicas"
                        ).style.display = "none";
                      }}
                    >
                      {/* Contenedor flex */}
                      <div className="h-full flex items-center">
                        {/* Parte izquierda */}
                        <div className="whitespace-nowrap overflow-x-hidden text-ellipsis">
                          {tematica.nombre}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Botón crear evento */}
            <button
              type="submit"
              className="bg-indigo-500 rounded-3xl mt-5 py-2 px-3 font-bold text-white text-sm hover:w hover:duration-100 hover:bg-indigo-700"
              onClick={() =>
                console.log(document.getElementById("campo-lugar").value)
              }
            >
              Crear evento
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
