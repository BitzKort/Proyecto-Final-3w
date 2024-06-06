/* eslint-disable react/prop-types */
import { buttonNext, buttonPrevious } from "../../../utils/svgs.jsx"

export default function EventsFilters({ activeFilter, setActiveFilter }) {

  function handleSetFilter(event) {
    if (event.target.name === activeFilter) {
      setActiveFilter('todos')
    } else {
      setActiveFilter(event.target.name)
    }
  }

  return (
    <>
      {/* Contenedor de filtros de los eventos */}
      <div className="relative w-full h-[36px] lg:w-full mt-3 text-[16px] z-10 outline outline-[7px] outline-white flex-shrink-0">

        {/* Contenedor scrollable de botones de filtros */}
        <div className="scroll-smooth no-scrollbar overflow-auto flex justify-between lg:justify-between whitespace-nowrap h-full" id="filter-container">

          {/* Botones de filtros */}
          <button
            className={`z-10 rounded-full px-[10px] mr-2 ${activeFilter === 'inscrito' ? 'bg-indigo-500 text-white' : 'bg-gray-200 border-0'}`}
            name="inscrito"
            onClick={(event) => handleSetFilter(event)}>
            Inscrito
          </button>
          <button
            className={`z-10 rounded-full px-[10px] mr-2 ${activeFilter === 'no_inscrito' ? 'bg-indigo-500 text-white' : 'bg-gray-200 border-0'}`}
            name="no_inscrito"
            onClick={(event) => handleSetFilter(event)}>
            No inscrito
          </button>
          <button
            className={`z-10 rounded-full px-[10px] mr-2 ${activeFilter === 'sin_empezar' ? 'bg-indigo-500 text-white' : 'bg-gray-200 border-0'}`}
            name="sin_empezar"
            onClick={(event) => handleSetFilter(event)}>
            Sin empezar
          </button>
          <button
            className={`z-10 rounded-full px-[10px] mr-2 ${activeFilter === 'en_progreso' ? 'bg-indigo-500 text-white' : 'bg-gray-200 border-0'}`}
            name="en_progreso"
            onClick={(event) => handleSetFilter(event)}>
            En progreso
          </button>
          <button
            className={`z-10 rounded-full px-[10px] mr-2 ${activeFilter === 'terminado' ? 'bg-indigo-500 text-white' : 'bg-gray-200 border-0'}`}
            name="terminado"
            onClick={(event) => handleSetFilter(event)}>
            Terminado
          </button>
        </div>

        {/* Contenedor controles de scroll horizontal */}
        <div className="w-full absolute top-0 left-0 flex justify-between items-center h-full">

          {/* Botón scroll hacia la izquierda */}
          <button
            className="z-10 hover:opacity-100 hover:cursor-pointer transition-all duration-500 opacity-0 rounded-full bg-white hidden lg:block"
            onClick={() => document.getElementById('filter-container').scrollLeft -= 200}>
            {buttonPrevious(25)}
          </button>

          {/* Botón scroll hacia la derecha */}
          <button
            className="z-10 hover:opacity-100 hover:cursor-pointer transition-all duration-500 opacity-0 rounded-full bg-white hidden lg:block"
            onClick={() => document.getElementById('filter-container').scrollLeft += 200}>
            {buttonNext(25)}
          </button>
        </div>
      </div>
    </>
  )
}