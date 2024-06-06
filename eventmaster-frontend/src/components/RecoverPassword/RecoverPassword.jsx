import { useState, useContext } from "react";
import axios from "axios";
import { RecoverPasswordContext } from "./RecoverPasswordProvider";
import { RecoverToken } from "./RecoverToken";
import ChangePass from "../RecoverPassword/ChangePass"


const RecoverPassword = () => {

  const [etapa, setEtapa] = useState('correo')

  const [email, setEmail] = useState("");

  const [mailError, setMailError] = useState(null)

  const { emailContext, setEmailValue } = useContext(RecoverPasswordContext);

  async function handleSubmit(e) {
    e.preventDefault();
    // Lógica para enviar el correo electrónico de recuperación de contraseña
    await axios.post('http://localhost:5000/api/usuario/recuperar-cuenta', { email })
      .then(async (response) => {
        console.log('Correo electrónico enviado con éxito');
        setEtapa('token')
        setMailError(null)
        // window.location.href = '/recovertoken';
      }

      )
      .catch(error => {
        console.error('Error al enviar el correo electrónico', error);
        // Aquí puedes manejar el error de envío de correo electrónico
        setMailError("Esta cuenta no existe")
      });
  };

  return (
    <>
      {etapa === 'correo' &&
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-f
        setEmailValue('hola')
        setEmailValue('hola')ull sm:max-w-md">
            <h2 className="font-bold text-3xl text-gray-900 text-center">¿Olvidaste tu contraseña? ¡Recupérala ya!</h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-gray-100 text-gray-500 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex -mx-3">
                  <div className="w-full px-3 ">
                    <label className="text-xs font-semibold px-1">
                      Ingresa tu e-mail aquí
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
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={"w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-${isValid ? 'green-500' : 'red-500'}"}
                        placeholder="alejogonzales@example.com"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    Enviar correo de recuperación
                  </button>
                </div>
                <p className="text-sm text-red-500 font-extrabold">
                  {mailError}
                </p>
              </form>
            </div>
          </div>
        </div>
      }
      {etapa === 'token' && <RecoverToken email={email} setEtapa={setEtapa} />}
      {etapa === 'changepass' && <ChangePass email={email} />}

    </>
  );
};

export default RecoverPassword;