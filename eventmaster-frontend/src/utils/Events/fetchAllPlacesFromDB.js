import axios from "axios"

export default async function fetchAllPlacesFromDB() {
  try {
    const allPlaces = await axios.get('http://localhost:5000/api/lugar/listar', {
      headers: {
        "Content-Type": 'application/json',
        Authorization: localStorage.getItem('token')
      }
    })

    return allPlaces.data.rows
  } catch (error) {
    console.log(error.message)
  }
}