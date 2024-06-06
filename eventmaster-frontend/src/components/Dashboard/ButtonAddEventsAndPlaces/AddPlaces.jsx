/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlacesContext } from "../Places/PlacesProvider";
import { UserDataContext } from "../../Profile/UserDataProvider";

const AddPlaces = ({ handleToggleMarker, placeName, markerAux, setMarkerAux, setIsToggled, isToggledMarker }) => {
  const { fetchPlaces } = useContext(PlacesContext)

  const { userData } = useContext(UserDataContext)

  const [nombreCiudad, setNombreCiudad] = useState("");
  const [codigoCiudad, setCodigoCiudad] = useState("");
  const [nombreImagen, setNombreImagen] = useState('Selecionar una imagen')

  useEffect(() => {
    if (userData.ciudad) {
      setNombreCiudad(userData.ciudad.nombre);
      setCodigoCiudad(userData.ciudad.codigo_ciudad);
    }
  }, [userData]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (dataJson) => {


    const formData = new FormData();

    // Agregar los valores de los campos ocultos al objeto FormData
    formData.append("direccion", placeName);
    formData.append("ciudad", codigoCiudad);
    formData.append("ubicacion", JSON.stringify(markerAux));

    const fotoInput = document.getElementById("foto");
    if (fotoInput.files.length > 0) {
      formData.append("foto", fotoInput.files[0]);
    }

    // Agregar los demás valores del formulario al objeto FormData
    for (const key in dataJson) {
      formData.append(key, dataJson[key]);
    }


    if (formData) {
      try {
        await fetch("http://localhost:5000/api/lugar/crear", {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        });
        setMarkerAux(null)
        await fetchPlaces()
        setIsToggled(false)
      } catch (error) {
        console.error(error);
      }
    }
  };

  return userData ? (
    <div className={`w-full px-3 mb-4 mt-3 items-center relative ${isToggledMarker ? 'h-6' : 'h-auto'} lg:h-auto`}>
      <div className="w-full items-center text-center justify-center pb-3">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-4">
            <label className="mb-3 font-semibold text-indigo-700 text-sm shadow-lg shadow-indigo-300">
              Crear un lugar
            </label>
          </div>
          <label className="mb-3 mt-3 text-xs font-semibold px-1">
            Nombre del lugar
          </label>
          <input
            type="text"
            placeholder="Nombre del lugar"
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            id="nombre"
            name="nombre"
            {...register("nombre", {
              required: true,
            })}
          />
          {errors.nombre?.type === "required" && (
            <p>Campo nombre es requerido *</p>
          )}

          {/* Dirección */}
          <label className="mb-2 text-xs font-semibold px-1">Dirección</label>
          <div className="flex justify-between gap-1">
            <input
              type="text"
              placeholder="Selecciona una dirección"
              className="w-[88%] px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 flex-grow"
              readOnly={true}
              value={placeName}
              id="direccion"
            />

            <button
              className={`relative px-1 rounded-md border-2 border-gray-200 outline-none hover:duration-200 ${isToggledMarker ? 'border-indigo-500' : 'hover:border-indigo-500'}`}
              onClick={(e) => {
                e.preventDefault()
                handleToggleMarker()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </button>
          </div>

          <label className="mb-2 text-xs font-semibold px-1">Aforo</label>
          <div className="flex items-center">
            <input
              type="number"
              placeholder="Ingresa el numero de personas maximo"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              id="aforo"
              name="aforo"
              min="1"
              pattern="^[0-9]+"
              {...register("aforo", {
                required: true,
              })}
            />
            {errors.aforo?.type === "required" && (
              <p>Campo aforo es requerido *</p>
            )}
          </div>

          <label className="mb-3 mt-3 text-xs font-semibold px-1">
            Descripción
          </label>
          <input
            type="text"
            placeholder="Descripción del lugar"
            className="w-full h-12 px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            id="descripcion"
            name="descripcion"
            {...register("descripcion", {
              required: true,
            })}
          />
          {errors.descripcion?.type === "required" && (
            <p>Campo descripción es requerido *</p>
          )}

          <label className="mb-3 mt-3 text-xs font-semibold px-1">Ciudad</label>
          <input
            type="text"
            readOnly={true}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            id="inputName"
            value={nombreCiudad}
          />

          {/* Imágen */}

          <label className="mb-3 mt-3 text-xs font-semibold px-1">Imagen</label>

          <div className="h-[49px] flex items-center mt-2 relative bg-white cursor-pointer rounded-lg shadow-[10px_10px_22px_-13px_rgba(0,0,0,0.4)] active:border-indigo-500 overflow-hidden hover:bg-[rgba(255,255,255,0.5)]">
            <input
              type="file"
              className="absolute top-0 right-0 left-0 bottom-0 w-full z-[9999] py-2 block mx-auto rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 opacity-0"
              id="foto"
              capture='capture'
              name="foto"
              onChange={(e) => {
                const nombre = e.target.files[0].name
                setNombreImagen(nombre)
              }}
              multiple={false}
            />
            <span className=" bg-indigo-500 h-full flex items-center justify-center px-3">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" fill="#ffffff" clipRule="evenodd">
                <path d="M9 16h-8v6h22v-6h-8v-1h9v8h-24v-8h9v1zm11 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-7.5 0h-1v-14.883l-4.735 5.732-.765-.644 6.021-7.205 5.979 7.195-.764.645-4.736-5.724v14.884z" />
              </svg>
            </span>
            <span className="text-left sm:text-center max-w-[425px] flex-grow whitespace-nowrap text-ellipsis px-2 overflow-hidden">
              {nombreImagen}
            </span>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 rounded-3xl mt-5 py-2 px-3 font-bold text-white text-sm hover:w hover:duration-100 hover:bg-indigo-700"
          >
            Crear lugar
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AddPlaces;
