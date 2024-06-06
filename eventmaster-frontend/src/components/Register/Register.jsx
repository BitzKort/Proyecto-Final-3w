import { useState } from "react";
import RegLogo from "../../assets/Auth/undraw-mobile-encryption.svg";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from "react-hook-form";
import axios from "axios";


const Register = () => {

  //Obtencíon de datos con react hook form
  const { register, formState: { errors }, handleSubmit } = useForm();


  //Registro de usuario llenando el formulario de registro
  const onSubmit = async (dataJson) => {
    console.log(dataJson);

    await axios.post('http://localhost:5000/api/register/user', {
      data: dataJson
    }).then((dataJson) => {

      // Si la persona ya tiene una cuenta 
      if (dataJson.data.token == null) {
        window.location.href = '/login';

        // Si no la tiene
      } else {
        localStorage.setItem('token', dataJson.data.token);
        window.location.href = '/profile/config';
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  // Registro con Google
  const handleLoginSuccess = (response) => {
    axios.post('http://localhost:5000/api/register/verify/google', {
      data: response,
      withCredentials: true
    }).then((response) => {

      //si es true es porque no esta registrado 
      if (response.data.token != null) {

        console.log("NO ESTAS REGISTRADO, VAS PARA LA BASE DE DATOS Y REDIRECCIONADO A PREFERENCIAS");

        localStorage.setItem('token', response.data.token);

        window.location.href = '/profile/config';

      } else {
        window.location.href = '/login';
      }
    })
      .catch((error) => {
        console.error(error);
      });
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  return (
    // Contenedor principal
    <div className="min-h-[89vh] flex justify-center gap-10">

      {/* Card completar registro */}
      <div className="my-5 max-w-[1200px] bg-gray-100 text-gray-500 rounded-3xl shadow-xl overflow-hidden flex-grow flex flex-col md:flex-row">

        {/* Contenedor imagen */}
        <div className="bg-indigo-500 flex-grow flex items-center py-5">
          <img
            className="max-h-[250px] md:max-h-max mx-auto"
            src={RegLogo}
          />
        </div>

        {/* Contenedor formulario de registro */}
        <div className="pb-4 pt-10 px-5">
          <h1 className="font-bold text-3xl text-gray-900 text-center">Registro</h1>
          <p className="text-center mb-6">Ingresa tu información para registrarte</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex -mx-3">
              <div className="w-1/2 px-3 mb-5">
                <label className="text-xs font-semibold px-1">
                  Nombre
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Alejandro"
                    {...register('nombre', {
                      required: true
                    })}
                  />
                </div>
                {errors.nombre?.type === 'required' && <p>Campo nombre es requerido *</p>}
              </div>
              <div className="w-1/2 px-3 mb-5">
                <label className="text-xs font-semibold px-1">
                  Apellido
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Gonzales"
                    {...register('apellido', {
                      required: true
                    })}
                  />
                </div>
                {errors.apellido?.type === 'required' && <p>Campo apellido es requerido *</p>}
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">
                  Nickname
                </label>
                <div className="flex relative">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="alejogonzales05"
                    {...register('nickname', {
                      required: true,
                      pattern: /^([a-zA-Z0-9]){1,16}$/
                    })}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-5 h-5 pl-1 text-center flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2"
                    onMouseOver={() => [document.getElementById("toolTipNick").style.display = "inline-block"]}
                    onMouseOut={() => [document.getElementById("toolTipNick").style.display = "none"]}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                  <div className="relative hidden" id="toolTipNick">
                    <div className="absolute z-10 left-0 -ml-48 mt-0 p-2 -top-[153px] -right-1 text-white bg-gray-900 rounded-lg shadow-lg opacity-60 w-48 tooltip">
                      Ingresa un nickname que tenga entre 1 a 16 carácteres, con mayúsculas y números includos.
                    </div>
                  </div>
                </div>
                {errors.nickname?.type === 'required' && <p>Campo nickname es requerido *</p>}
                {errors.nickname?.type === 'pattern' && <p>Ingrese un nickname válido *</p>}
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">
                  E-mail
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className={"w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-${isValid ? 'green-500' : 'red-500'}"}
                    placeholder="alejogonzales@example.com"
                    {...register('email', {
                      required: true,
                      pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
                    })}
                  />
                </div>
                {errors.email?.type === 'pattern' && <p>Inserte un email válido *</p>}
                {errors.email?.type === 'required' && <p>Campo email es requerido *</p>}
              </div>
            </div>

            <div className="flex -mx-3">
              <div className="w-full px-3 mb-12">
                <label className="text-xs font-semibold px-1">
                  Password
                </label>
                <div className="flex relative">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 absolute"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="w-full -ml-10 pl-10 pr-20 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="************"
                    {...register('password', {
                      required: true,
                      pattern: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
                    })}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-5 h-5 pl-1 text-center flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                  <div className="relative inline-block">
                    {showTooltip && (
                      <div className="absolute z-10 left-0 -ml-48 -mt-[3px] p-2 -top-40 -right-1 text-white bg-gray-900 rounded-lg shadow-lg opacity-60 w-48 tooltip">
                        La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
                      </div>
                    )}
                  </div>
                </div>
                {errors.password?.type === 'pattern' && <p>Inserte una contraseña válida *</p>}
                {errors.password?.type === 'required' && <p>Campo contraseña es requerido *</p>}
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <button type="submit" className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                  REGISTRAR
                </button>
              </div>
            </div>
            <div className="text-center mt-4 ">
              - O crea una cuenta con -
            </div>

            <button className="rounded-full flex items-center justify-center border-1 border-gray-200 hover:bg-gray-200 w-13 max-w-xs mx-auto mt-4 text-black px-1 font-normal">
              <GoogleOAuthProvider clientId="650698705793-eetbgpi48lld1tb4eol6n8g355raapeg.apps.googleusercontent.com">
                <GoogleLogin
                  type="icon"
                  shape="circle"
                  size="large"
                  onSuccess={handleLoginSuccess}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </button>
          </form>
        </div>


      </div>
    </div>
  );
};

export default Register; 
