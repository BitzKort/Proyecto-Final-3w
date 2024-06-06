import EventmasterLogo from './../assets/eventmaster-logo.png'


const Footer = () => {
  return (
    // Contenedor del footer
    <footer className="absoulte bottom-0 bg-gray-800 p-2 py-6 ">

      {/* Contenedor para limitar el ancho del contenido del footer */}
      <div className="flex justify-center min-[506px]:justify-between flex-wrap min-[824px]:flex-nowrap items-center text-left lg:text-left w-full "> {/* [&>div]:border-2 [&>ul]:border-2 */}

        {/* Contenedor título de la app y logo de GitHub */}
        <div className="flex items-center px-4 flex-shrink-0 text-center min-[506px]:text-left">
          <div className="inline-block">
            <h4 className="text-3xl fonat-semibold text-gray-100">
              Eventmaster
            </h4>
            <h5 className="text-lg text-gray-100">
              Gestión de eventos.
            </h5>
          </div>
          ,<img src={EventmasterLogo} alt="" width='80px' />
        </div>

        {/* Derechos de autor */}
        <div className="text-sm text-center w-full text-gray-100 font-semibold mx-5 flex-shrink order-last min-[824px]:order-[2] mt-6 min-[824px]:my-0">
          Copyright © 2024. Proyecto creado por - Grupo 7 - WWW.
        </div>

        {/* Enlaces de interés */}
        <ul className="text-center min-[824px]:text-right flex-shrink-0 order-2 min-[824px]:order-[3] mt-6 min-[506px]:mt-0 mr-3">
          <li className="uppercase text-indigo-200 text-sm font-bold">
            ENLACES DE INTERES
          </li>
          <li>
            <a
              className="text-gray-100 hover:text-gray-400 font-semibold text-sm"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
              About
            </a>
          </li>
          <li>
            <a
              className="text-gray-100 hover:text-gray-400 font-semibold block text-sm"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
              Desarrollo
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
