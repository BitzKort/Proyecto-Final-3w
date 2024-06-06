import React, { useContext , useState, useEffect} from "react";
import { EventUserContext } from "./EventUserProvider";

const EventUserProfile = () => {
  const { userData } = useContext(EventUserContext);

  const [nombre, setNombre] = useState("Carlos");
  const [nickname, setNickname] = useState("Guerrero");
  const [correo, setCorreo] = useState("crlitosguerreroproductions@gmail.com");
  const [fechaNacimiento, setFechaNacimiento] = useState("2002-07-07");
  const [ciudad, setCiudad] = useState("Tulua");
  const [descripcion, setDescripcion] = useState("Estudiante de Ingeniería de Sistemas de la Universidad del Valle sede Tuluá");



  return (
    <div className="flex flex-col lg:flex-row lg:h-[89vh] justify-center">
      {/* Card información del perfil */}
      <div className="flex items-start justify-center rounded-3xl border-2 border-indigo-400 bg-slate-200 py-5 m-8 overflow-auto">
        {/* Información */}
        <div className="flex flex-col ">
          {/* Foto de perfil */}
          <img
            src={localStorage.getItem("profilePicture")}
            alt=""
            className="w-24 h-24 mx-auto rounded-full"
          />

          {/* Nickname */}
          <p className="text-indigo-500 text-center pt-4 font-bold text-xl">
            {nickname}
          </p>
          <p className="text-black text-center pt-4 pb-1 font-bold text-base">
            Acerca del usuario participante
          </p>

          {descripcion !== "" && descripcion !== null ? (
            <div className="text-black text-center bg-gray-100">
              {descripcion}
            </div>
          ) : (
            <div className="bg-gray-100">No hay una descripcion disponible</div>
          )}

          <p className="text-black text-center pt-4 font-bold text-base">
            Nombre:
          </p>
          <p className="text-black text-center text-base">{nombre}</p>
          <p className="text-black text-center pt-4 font-bold text-base">
            Correo electrónico:
          </p>
          <p className="text-black text-center text-base">{correo}</p>
          <p className="text-black text-center pt-4 font-bold text-base">
            Fecha de nacimiento:
          </p>
          <p className="text-black text-center text-base">{fechaNacimiento}</p>
          <p className="text-black text-center pt-2 font-bold text-base">
            Ciudad:
          </p>
          <p className="text-black text-center text-base">{ciudad}</p>
        </div>
      </div>
    </div>
  );
};

export default EventUserProfile;
