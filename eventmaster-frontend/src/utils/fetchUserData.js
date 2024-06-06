import axios from "axios";
import { decodeToken } from "react-jwt";
import fetchCityFromDB from "./City/fetchCityFromDB";

export async function fetchUserData() {
  const token = localStorage.getItem('token')
  if (token) {
    const { id } = decodeToken(token)
    try {
      const userData = await axios.post('http://localhost:5000/api/persona/consultar', { id })
      const ciudad = await fetchCityFromDB()
      userData.data.ciudad = ciudad[0]
      return userData
    } catch (error) {
      console.log(error.message)
    }
  }
  return null
}