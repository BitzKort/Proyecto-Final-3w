/* eslint-disable react/prop-types */
import { ellipsis } from "../../../utils/svgs";

export default function EventOwnerMenu({
  ownerMenu,
  setOwnerMenu,
  modifyingEvent,
  setModifyingEvent,
  handleReset,
  deleteEvent
}) {

  return (
    <>
      {/* Menú del propietario del evento */}
      <span
        onClick={() => {
          setOwnerMenu(!ownerMenu);
        }}
        className="text-base font-bold absolute top-2 left-2 rounded-3xl cursor-pointer hover:scale-[0.8] hover:transition-all duration-500 p-1 hover:bg-indigo-400"
      >
        {ellipsis(26)}
      </span>

      {/* Opciones del menú del propietario */}
      {ownerMenu && (
        <div className="absolute top-7 left-4 z-50 mt-2 bg-white divide-y divide-gray-200 rounded-md shadow-lg overflow-hidden">
          <button
            className="block px-4 py-2 text-sm w-full text-gray-700 hover:bg-indigo-400 hover:duration-500 z-50"
            onClick={() => {
              setModifyingEvent(!modifyingEvent);
              setOwnerMenu(!ownerMenu);
              if (modifyingEvent) {
                handleReset();
              }
            }}
          >
            {modifyingEvent ? "Cancelar" : "Modificar"}
          </button>
          <button
            className="block px-4 py-2 text-sm w-full text-gray-700 hover:bg-red-600 hover:duration-500 hover:text-white z-50"
            onClick={deleteEvent}
          >
            Eliminar
          </button>
        </div>
      )}
    </>
  )
}