import React, { useState, useContext } from "react";
import axios from "axios";
import { RecoverPasswordContext } from "./RecoverPasswordProvider";

export const RecoverToken = ({ email, setEtapa }) => {
  const [token, setToken] = useState('');

  const [tokenError, setTokenError] = useState(null);

  const { emailContext } = useContext(RecoverPasswordContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const correo_electronico = emailContext
    const token_recuperacion = token

    console.log(email, token)
    // Lógica para enviar el token de recuperación de contraseña
    axios
      .post("http://localhost:5000/api/usuario/recuperar-cuenta-token", { token_recuperacion, correo_electronico: email })
      .then((response) => {
        console.log("Token enviado con exito");
        setEtapa('changepass')
        // Aquí puedes realizar cualquier acción adicional después de enviar el correo electrónico

        if (response.data.success) {
        } else {
          // Redireccionar a una página de error
          // window.location.href = "/changepass";
          setTokenError(null);
        }
      })
      .catch((error) => {
        console.error("Error al enviar el token", error);
        // Aquí puedes manejar el error de envío de correo electrónico
        setTokenError("El token no es valido, intentalo nuevamente");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-100 text-gray-500 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex -mx-3">
              <div className="w-full px-3 ">
                <label className="text-xs font-semibold px-1">
                  Ingresa el código que llegó a tu correo electrónico
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </div>
                  <input
                    id="token"
                    name="token"
                    type="number"
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className={
                      "w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-${isValid ? 'green-500' : 'red-500'}"
                    }
                    placeholder="123456"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Enviar token de recuperación
              </button>
            </div>
            <p className="text-sm text-red-500 font-extrabold text-center">{tokenError}</p>
          </form>
        </div>
      </div>
    </div>
  );
};
