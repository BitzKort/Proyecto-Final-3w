import { createContext, useState, useEffect } from "react";
import { fetchUserData } from "../../utils/fetchUserData";

// Creación del contexto
const UserDataContext = createContext();

function UserDataProvider({ children }) {
  // Estado para guardar la información del usuario
  const [userData, setUserData] = useState(null);

  // Consultar la información del usuario en la bd
  async function getUserDataFromDB() {
    const response = await fetchUserData();
    if (response) {
      setUserData(response.data);
      const foto = response.data.foto;
      let imageUrl;

      if (foto && foto.startsWith("https://lh3.googleusercontent.com/")) {
        // Si la foto es un enlace, utiliza directamente la ruta almacenada en los datos del usuario
        imageUrl = foto;
      } else if (foto) {
        // Si la foto es una ruta del backend, construye la URL completa utilizando la ruta y el origen del backend
        imageUrl = `http://localhost:5000/${foto}`;
      } else {
        // Si no hay foto, asigna una imagen por defecto
        imageUrl =
          "https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif";
      }

      fetchImage(imageUrl).then((base64data) => {
        // Guarda la imagen en el localStorage como 'profilePicture'
        localStorage.setItem("profilePicture", base64data);
      });
    }
  }

  const fetchImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onloadend = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsDataURL(blob);
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Ejecutar la función al cargar el componente
  useEffect(() => {
    getUserDataFromDB();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, getUserDataFromDB }}>
      {children}
    </UserDataContext.Provider>
  );
}

export { UserDataContext, UserDataProvider };
