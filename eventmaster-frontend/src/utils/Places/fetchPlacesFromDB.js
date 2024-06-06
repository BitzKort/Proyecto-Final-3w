import axios from "axios";

export default async function fetchPlacesFromDB() {
  try {
    const lugares = await axios.get('http://localhost:5000/api/lugar/consultar', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
    })

    const nuevosLugares = lugares.data.rows.filter((lugar) => lugar.estado !== 'inactivo')
    return nuevosLugares;
  } catch (error) {
    console.error('Error al realizar la solicitud al backend:', error.message);
  }
}