/* eslint-disable react/prop-types */
import { close } from "../utils/svgs";

const VentanaModal = ({ children, estado, cambiarEstado }) => {

  document.body.classList.add('overflow-hidden');

  return (
    <>
      {estado &&

        // Fondo oscuro
        <div className="fixed z-[9999] bg-[rgba(0,0,0,0.2)] h-[100vh] w-[100vw] left-0 top-0 overflow-clip flex justify-center items-center" id="background"
          onClick={(e) => {
            if (e.target.id === 'background') {
              cambiarEstado(null)
              document.body.classList.remove('overflow-hidden');
            }
          }}
        >

          {/* Card */}
          <div className="z-[9999] bg-white rounded-[14px] relative min-w-[250px] max-w-[370px] sm:max-w-[470px] max-h-[70vh] sm:max-h-[70vh] px-3 sm:px-7 flex-grow overflow-auto">
            <div className="sticky top-0 translate-x-[10px]">
              <span onClick={() => {
                document.body.classList.remove('overflow-hidden');
                cambiarEstado(false)
              }}
                className="z-[9999] text-base font-bold absolute top-2 right-2 rounded-3xl cursor-pointer hover:scale-[0.8] hover:transition-all duration-500 p-1 hover:bg-red-500">
                {close(22)}
              </span>
            </div>
            {children}
          </div>
        </div>
      }
    </>
  )
}

export default VentanaModal;