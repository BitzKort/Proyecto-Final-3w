import { motion } from "framer-motion";
import EventAni from "../../assets/eventmaster-video.mp4";

const Home = () => {
  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="w-full bg-indigo-200 min-h-[89vh] flex py-5"
    >

      {/* Contenedor para video y presentación */}
      <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-5 lg:justify-evenly">

        {/* Video */}
        <div className="max-w-[600px] lg:max-w-[800px] basis-[50%]">
          <motion.h1
            whileHover={{ scale: [null, 1.1] }}
            transition={{ duration: 0.1 }}
            className="text-5xl lg:text-6xl text-center font-extrabold text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] mt-7"
          >
            Eventmaster
          </motion.h1>
          <p className="text-base lg:text-2xl text-center font-semibold text-indigo-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] my-2">
            App de gestión de eventos
          </p>
          <video src={EventAni} className="" autoPlay />
        </div>

        {/* Contenedor para el texto de presentación y botón de registro */}
        <div className="rounded-lg bg-lime-50 pt-10 px-4 lg:px-10 mx-3 max-w-[600px] lg:max-w-[500px]  basis-[50%]">
          <p className="text-base text-center font-semibold text-gray-900 ">
            ¡Bienvenido a Eventmaster, la mejor aplicación de gestión de eventos!
            Aquí encontrarás un espacio vibrante y conectado, donde podrás
            descubrir y compartir experiencias únicas. Desde conciertos hasta
            festivales, pasando por conferencias inspiradoras y encuentros
            culturales, Eventmaster te mantendrá actualizado sobre los eventos más
            destacados. Conéctate con personas apasionadas como tú, qué esperas para sumarte.
          </p>

          {/* Botón de registro */}
          <a className="max-w-[230px] flex items-center justify-center gap-2 bg-indigo-500 text-slate-50 font-semibold rounded-full h-10 mx-auto mt-6 mb-8" href="/register">
            <svg
              role="img"
              width={24}
              height={30}
              fill="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <title>Registrate</title>
              <path d="M10.7754 17.3477H5.8065a.2815.2815 0 1 0 0 .563h4.9689a.2815.2815 0 1 0 0-.563zm7.3195 0h-4.9688a.2815.2815 0 1 0 0 .563h4.9688a.2815.2815 0 0 0 0-.563zm-7.3336-6.475H5.8065a.2815.2815 0 1 0 0 .563h4.9548a.2815.2815 0 1 0 0-.563zm7.3195 0h-4.9547a.2815.2815 0 1 0 0 .563h4.9547a.2815.2815 0 0 0 0-.563zm.5518-9.2001h-4.341a2.4042 2.4042 0 0 0-4.5804 0H5.3674c-1.7103 0-3.0968 1.3864-3.0968 3.0967v16.134C2.2706 22.6135 3.6571 24 5.3674 24h13.2652c1.7103 0 3.0968-1.3865 3.0968-3.0967V4.7693c0-1.7103-1.3865-3.0967-3.0968-3.0967zm-8.7046.563a.2815.2815 0 0 0 .2815-.2224 1.8411 1.8411 0 0 1 3.5979 0 .2815.2815 0 0 0 .2815.2224h1.5146v1.844a.8446.8446 0 0 1-.8446.8446H9.2552a.8446.8446 0 0 1-.8446-.8446v-1.844Zm11.2383 18.6677c0 1.3993-1.1344 2.5337-2.5337 2.5337H5.3674c-1.3993 0-2.5337-1.1344-2.5337-2.5337V4.7693c0-1.3993 1.1344-2.5337 2.5337-2.5337h2.4802v1.844c0 .7774.6302 1.4076 1.4076 1.4076h5.4896c.7774 0 1.4076-.6302 1.4076-1.4076v-1.844h2.4802c1.3993 0 2.5337 1.1344 2.5337 2.5337z" />
            </svg>
            Registrate ahora
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
