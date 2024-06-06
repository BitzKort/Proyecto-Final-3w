/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import getEventStatus from "../../../utils/getEventStatus.js";
import { clockSVG, calendarSVG } from "../../../utils/svgs";
import { UserDataContext } from "../../Profile/UserDataProvider.jsx";
import { useForm } from "react-hook-form";
import EventOwnerMenu from "./EventMenuOwner.jsx";
import deleteEventFromDB from "../../../utils/Events/deleteEventFromDB.js";
import modifyEventToDB from "../../../utils/Events/modifyEventToDB.js";
import VentanaModal from "../../VentanaModal.jsx";
import inscripcionEvento from "../../../utils/Events/inscripcionEvento.js";
import anularInscripcion from "../../../utils/Events/anularInscripcionEvento.js";
import obtenerParticipantes from "../../../utils/Events/obtenerParticipantes.js";
import { EventUserContext } from "./EventUserProvider.jsx";


const eventStatus = {
  terminado: {
    text: "Terminado",
    color: "text-gray-500",
  },
  en_progreso: {
    text: "En progreso",
    color: "text-green-500",
  },
  sin_empezar: {
    text: "Sin empezar",
    color: "text-blue-500",
  },
};

const tematicas = {
  T001: 'Tecnología',
  T002: 'Ciencia',
  T003: 'Salud',
  T004: 'Educación',
  T005: 'Negocios',
  T006: 'Arte',
  T007: 'Música',
  T008: 'Deportes',
  T009: 'Literatura',
  T010: 'Cine',
  T011: 'Gastronomía',
  T012: 'Medio Ambiente',
  T013: 'Historia',
  T014: 'Política',
  T015: 'Moda',
  T016: 'Viajes',
  T017: 'Fotografía',
  T018: 'Psicología',
  T019: 'Innovación',
  T020: 'Desarrollo Personal'
};

export default function EventDetails({
  selectedEvent,
  setSelectedEvent,
  updateEvents,
}) {
  // Declaración de estados y contextos

  // Variable para actualizar el estado del evento (en progreso, terminado, sin empezar) si es modificado
  const [status, setStatus] = useState(() => handleEventStatus());

  // Abrir o cerrar el menú del propietario del evento
  const [ownerMenu, setOwnerMenu] = useState(false);

  // Determinar si se está modificando un evento
  const [modifyingEvent, setModifyingEvent] = useState(false);

  // Lista de participantes del evento
  const [participantes, setParticipantes] = useState(null);

  //Estado botón de anular inscripción (Temporal)
  const [esParticipante, setEsParticipante] = useState(false);

  // Se consulta el usuario para obtener la id
  const { userData } = useContext(UserDataContext);

  const { setUser, setEvent } = useContext(EventUserContext);

  // Uso de react-hook-form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Funciones para manejar el estado de los

  // Cambiar el estado del evento
  async function handleEventStatus() {
    if (selectedEvent) {
      const showStatus = await eventStatus[
        getEventStatus(
          selectedEvent.fecha.substring(0, 10),
          selectedEvent.hora_inicio.substring(0, 5),
          selectedEvent.hora_final.substring(0, 5)
        )
      ];
      setStatus(showStatus);
    }
  }

  // Obtener la lista de participantes del evento
  async function obtenerListaParticipantes() {
    const listaParticipantes = await obtenerParticipantes(
      selectedEvent.codigo_evento
    );
    setParticipantes(listaParticipantes.data.rows);
  }

  useEffect(() => {
    if (selectedEvent) {
      handleEventStatus();
      obtenerListaParticipantes();
      handleReset();
    }
    setOwnerMenu(false);
  }, [selectedEvent]);

  // Declaración de funciones

  // Restablecer el contenido de los inputs
  const handleReset = () => {
    reset({
      nombre: selectedEvent.nombre,
      descripcion: selectedEvent.descripcion,
      fecha: selectedEvent.fecha.substring(0, 10),
      hora_inicio: selectedEvent.hora_inicio.substring(0, 5),
      hora_final: selectedEvent.hora_final.substring(0, 5),
    });
  };

  // Función para enviar el evento a la bd
  async function modifyEvent(modifiedEventData) {
    try {
      await modifyEventToDB(selectedEvent.codigo_evento, modifiedEventData);
      setModifyingEvent(false);
      updateEvents();
      modifiedEventData = {
        ...selectedEvent,
        ...modifiedEventData,
      };
      setSelectedEvent({
        ...modifiedEventData,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Funcion para borrar un evento
  async function deleteEvent() {
    try {
      await deleteEventFromDB(selectedEvent.codigo_evento);

      // Realizar cualquier otra acción necesaria después de eliminar el evento, como actualizar la lista de eventos
      updateEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error(error);
    }
  }

  // Funcion para inscribirse al evento
  async function inscribirseEvento() {
    try {
      await inscripcionEvento(selectedEvent.codigo_evento);

      // Realizar cualquier otra acción necesaria después de eliminar el evento, como actualizar la lista de eventos
      obtenerListaParticipantes();
    } catch (error) {
      console.error(error);
    }
  }

  // Funcion para salir del evento
  async function anularInscripcionEvento() {
    try {
      await anularInscripcion(selectedEvent.codigo_evento);

      // Realizar cualquier otra acción necesaria después de eliminar el evento, como actualizar la lista de eventos
      obtenerListaParticipantes();
      setEsParticipante(false);
    } catch (error) {
      console.error(error);
    }
  }

  // Función para verificar si el usuario participa en el evento
  const participaEnEvento = () => {
    if (participantes) {
      participantes.forEach((participante) => {
        if (participante.id === userData.id) {
          setEsParticipante(true);
        }
      });
    }
  };

  const obtenerParticipante = (user) => {
    setUser(user);
    setEvent(selectedEvent);
  };
  useEffect(() => {
    participaEnEvento();
  }, [participantes]);

  return selectedEvent ? (
    // Cuadro de diálogo modal
    <VentanaModal estado={selectedEvent} cambiarEstado={setSelectedEvent}>
      {/* Menú del propietario del evento */}
      {selectedEvent.creador === userData.id && (
        <EventOwnerMenu
          ownerMenu={ownerMenu}
          setOwnerMenu={setOwnerMenu}
          modifyingEvent={modifyingEvent}
          setModifyingEvent={setModifyingEvent}
          handleReset={handleReset}
          deleteEvent={deleteEvent}
        />
      )}

      {/* Contenido del evento */}
      {selectedEvent && (
        <form
          className="py-6 px-[8px] grid grid-cols-2"
          onSubmit={handleSubmit(modifyEvent)}
        >
          {/* Nombre del evento */}
          <input
            className={`text-xl font-bold text-center col-span-2 mb-3 mt-3 cursor-text ${modifyingEvent
              ? "border-gray-300 border-[1px] rounded-md"
              : "border-0"
              }`}
            placeholder="Nombre del evento"
            disabled={!modifyingEvent}
            {...register("nombre", {
              required: true,
              value: selectedEvent.nombre,
            })}
          />
          {errors.nombre?.type === "required" && (
            <p>Campo nombre es requerido *</p>
          )}

          {/* Descripción del evento */}
          <textarea
            className={`text-center resize-none overflow-y-scroll h-auto col-span-2 mb-3 px-3 cursor-text ${modifyingEvent
              ? "border-gray-300 border-[1px] rounded-md"
              : "border-0"
              }`}
            disabled={!modifyingEvent}
            placeholder="Descripción del evento"
            rows={selectedEvent.descripcion.length < 75 ? 2 : 3}
            {...register("descripcion", {
              required: true,
              value: selectedEvent.descripcion,
            })}
          />
          {errors.descripcion?.type === "required" && (
            <p>Campo descripción es requerido *</p>
          )}

          {/* ----------------------------------------------- */}

          {/* Encabezado estado del evento */}
          <p className="text-center font-bold">Estado</p>


          {/* Encabezado lugar del evento */}
          <p className="text-center font-bold">Lugar</p>

          {/* Estado del evento */}
          <p
            className={`${status.color} mb-8 text-center`}
          >{`● ${status.text}`}</p>


          {/* Lugar del evento */}
          <p className="text-center mb-6">
            {selectedEvent.lugar ? selectedEvent.lugar.nombre : ""}
          </p>


          {/* ----------------------------------------------- */}

          {/* Encabezado fecha */}
          <p className="text-center font-bold">Fecha</p>
          {/* Encabezado horario */}
          <p className="text-center font-bold">Horario</p>

          {/* Fecha del evento */}
          <p className="text-sm text-center lg:text-center">
            {!modifyingEvent && (
              <span className="mr-[6px]">{calendarSVG(20)}</span>
            )}
            <input
              type="date"
              className={`align-middle relative ${modifyingEvent
                ? "border-gray-300 border-[1px] rounded-md"
                : "border-0"
                }`}
              min={new Date().toISOString().split("T")[0]}
              disabled={!modifyingEvent}
              {...register("fecha", {
                required: true,
                value: selectedEvent.fecha.substring(0, 10),
              })}
            />
          </p>

          {/* Hora del evento */}
          <p className="text-sm text-center lg:text-center">
            <span className="mr-[6px]">{clockSVG(18)}</span>

            {/* Hora de inicio */}
            <span className="align-end">
              <input
                className={`w-12 text-center col-span-2 mb-3 cursor-text ${modifyingEvent
                  ? "border-gray-300 border-[1px] rounded-md"
                  : "border-0"
                  }`}
                placeholder="00:00"
                disabled={!modifyingEvent}
                {...register("hora_inicio", {
                  required: true,
                  value: selectedEvent.hora_inicio.substring(0, 5),
                  pattern: {
                    value: /([0-1]?[0-9]|2[0-3]):[0-5][0-9]/,
                    message: "Formato de hora de inicio no válido",
                  },
                })}
              />
              {" - "}
              {/* Hora final */}
              <input
                className={`w-12 text-center col-span-2 mb-3 cursor-text ${modifyingEvent
                  ? "border-gray-300 border-[1px] rounded-md"
                  : "border-0"
                  }`}
                placeholder="00:00"
                disabled={!modifyingEvent}
                {...register("hora_final", {
                  required: true,
                  value: selectedEvent.hora_final.substring(0, 5),
                  pattern: {
                    value: /([0-1]?[0-9]|2[0-3]):[0-5][0-9]/,
                    message: "Formato de hora final no válido",
                  },
                })}
              />
            </span>
          </p>

          {/* ----------------------------------------------- */}

          {/*Encabezado temática del evento */}
          <p className="text-center font-bold col-span-2">Temática</p>
          {/* Temática del evento */}
          {selectedEvent && (
            <p className="text-sm text-center col-span-2">{tematicas[selectedEvent.tematica]}</p>
          )}

          {errors.hora_inicio && (
            <p className="col-span-2 text-center">
              {" "}
              {errors.hora_inicio.message}
            </p>
          )}
          {errors.hora_final && (
            <p className="col-span-2 text-center">
              {" "}
              {errors.hora_final.message}
            </p>
          )}

          {/* ----------------------------------------------- */}

          {/* Botón guardar evento editado*/}
          {modifyingEvent && (
            <button
              className="my-2 rounded-3xl mx-auto font-bold text-white text-center bg-indigo-500 col-span-2 hover:bg-indigo-700 py-2 px-3"
              type="submit"
            >
              Guardar
            </button>
          )}

          {/* Lista de participantes */}
          <details className="block w-[240px] max-w-[240px] min-w-[150px] p-1 mt-5 mb-3 mx-auto border-[1px] border-indigo-500 rounded-lg col-span-2 cursor-pointer">
            <summary>Participantes</summary>
            {participantes === null ? (
              <div>No hay participantes</div>
            ) : (
              participantes.map((participante, index) => (
                <div key={index}>
                  <a
                    href="/evento/usuario"

                    onClick={obtenerParticipante(participante.nickname)}
                  >
                    {participante.nickname}
                  </a>
                </div>
              ))
            )}
          </details>

          {/* Botón unirse al evento */}
          {selectedEvent.creador === userData.id ? (
            <button
              onClick={deleteEvent}
              className="rounded-3xl mx-auto my-3 font-bold text-white text-center bg-red-500 col-span-2 hover:bg-red-700 py-2 px-3"
            >
              Eliminar evento
            </button>
          ) : esParticipante ? (
            <button
              onClick={anularInscripcionEvento}
              className="rounded-3xl mx-auto my-3 font-bold text-white text-center bg-red-500 col-span-2 hover:bg-red-700 py-2 px-3"
            >
              Salir del evento
            </button>
          ) : (
            <button
              onClick={inscribirseEvento}
              className="rounded-3xl mx-auto my-3 font-bold text-white text-center bg-indigo-500 col-span-2 hover:bg-indigo-700 py-2 px-3"
            >
              Quiero unirme
            </button>
          )}
        </form>
      )}
    </VentanaModal>
  ) : null;
}
