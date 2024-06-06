import axios from "axios";

export default async function fetchCityFromDB() {
  try {
    const ciudad = await axios.get('http://localhost:5000/api/ciudad/obtener', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
    });
    return ciudad.data.rows; // Almacenar los datos en el estado local
  } catch (error) {
    console.error('Error al realizar la solicitud al backend:', error.message);
  }
}