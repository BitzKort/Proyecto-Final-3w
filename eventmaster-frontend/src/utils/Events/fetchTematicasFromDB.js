import axios from "axios";

export default async function fetchTematicasFromDB() {
  try {
    const tematicas = await axios.get('http://localhost:5000/api/tematicas/consultar', {
      headers: {
        "Content-Type": 'application/json',
        Authorization: localStorage.getItem('token')
      }
    })
    console.log(tematicas.data.rows)
    return tematicas.data.rows
  } catch (error) {
    console.log(error.message)
  }
}