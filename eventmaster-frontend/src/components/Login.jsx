import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserDataContext } from "./Profile/UserDataProvider";
import ErrorLogin from "./VentanaModal";

const Login = () => {
  // Función para consultar info del usuario en la bd cuando se haga login
  const { userData, getUserDataFromDB } = useContext(UserDataContext);

  //Obtencíon de datos con react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Redirección con base en si tiene o no el perfil completo
  useEffect(() => {
    if (userData) {
      (!userData.genero || !userData.fecha_nacimiento || !userData.ciudad) ? window.location.href = "/profile/config" : window.location.href = "/dashboard"
    }
  }, [userData]);

  // Login con Google
  const handleLoginSuccess = async (response) => {
    console.log(response);
    //devuelve el JWT
    await axios
      .post("http://localhost:5000/api/login/verify/google", {
        data: response,
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.token != null) {
          localStorage.setItem("token", response.data.token);
          console.log("la respuesta entro y es: " + response.data.token);
          getUserDataFromDB();
        } else {
          console.log("la respuesta no entro y es: " + response.data);
          window.location.href = "/register";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Verificar login con nickname y contraseña
  const onSubmit = async (data) => {
    try {
      // Petición para buscar el usuario en la bd y generar el token JWT
      const response = await axios.post(
        "http://localhost:5000/api/create/JWT",
        data
      );

      // Si se generó el token:
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Token a localStorage
        getUserDataFromDB(); // Obtención de los datos del usuario
      }
      // Si no se generó el token
      else {
        console.log("la respuesta es: " + response.data.token);
        console.log(
          "tienes algo mal en la contraseña, o usuario O no estas registrado"
        );
        cambiarEstadoErrorLogin(true);
      }
    } catch (error) {
      // Aquí puedes manejar los errores que ocurran durante la solicitud
      console.error(error);
    }
  };

  const [estadoErrorLogin, cambiarEstadoErrorLogin] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // Contenedor principal
    <div className="flex flex-col justify-center items-center py-5 lg:min-h-[89vh]">
      {/* Contenedor del formulario (card) */}

      <div className="px-10 pt-10 pb-0 bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-[80%] mx-5 max-w-[500px] overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <h1 className="font-bold text-3xl text-gray-900 text-center mb-7">
            Eventmaster
          </h1>

          {/* Div nickname */}
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <label className="text-sm font-semibold px-1">Nickname</label>

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
                      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="alejogonzales05"
                  {...register("nickname", {
                    required: true,
                  })}
                />
              </div>
              {errors.nickname?.type === "required" && (
                <p>Campo nickname es requerido *</p>
              )}
            </div>
          </div>

          {/* Div contraseña */}
          <div className="flex flex-col -mx-3">
            <div className="w-full px-3 mb-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold px-1">Contraseña</label>
                <a
                  href="/recoverpassword"
                  className="text-sm font-semibold text-indigo-500 hover:text-indigo-700 text-right"
                >
                  Recuperar contraseña
                </a>
              </div>

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
                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder={showPassword ? "password" : "••••••••"}
                  {...register("password", {
                    required: true,
                  })}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <svg
                      className={`h-6 ${showPassword ? "text-gray-700" : "text-indigo-500"
                        }`}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      onClick={togglePasswordVisibility}
                    >
                      <path
                        fill="currentColor"
                        opacity={0.6}
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className={`h-6 ${showPassword ? "text-indigo-500" : "text-gray-700"
                        }`}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      onClick={togglePasswordVisibility}
                    >
                      <path
                        fill="currentColor"
                        opacity={0.6}
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      ></path>
                    </svg>
                  )}
                </div>
              </div>
              {errors.password?.type === "required" && (
                <p>Campo contraseña es requerido *</p>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="w-full px-3 mb-5">
            <button
              type="submit"
              className="block w-full max-w-xs mx-auto mt-5 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
              Continuar
            </button>

            <ErrorLogin
              estado={estadoErrorLogin}
              cambiarEstado={cambiarEstadoErrorLogin}
            >
              <h1 className="text-center text-xl font-semibold mt-9 mb-3">
                ¡Error al intentar iniciar sesión!
              </h1>
              <p className="text-center mb-5">
                Por favor verifíca que la información de tu nickname y/o
                contraseña estén bien.
              </p>
            </ErrorLogin>

            <div className="text-center mt-4 ">- O continua con -</div>

            {/* Botón de Google */}
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
          </div>
        </form>
      </div>

      {/* No tienes cuenta??? */}
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl overflow-hidden mt-8 px-4 py-3">
        <p className="font-bold text-semibold text-gray-900">
          ¿No tienes cuenta?
          <a
            href="/register"
            className="text-semibold font-bold text-indigo-500 hover:text-indigo-700"
          >
            {" "}
            Crea una
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
