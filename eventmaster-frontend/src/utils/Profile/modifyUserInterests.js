import axios from "axios";

export default async function modifyUserInterests(modifiedInterests) {
  try {
    const response = await axios.post('http://localhost:5000/api/persona/intereses/modificar', modifiedInterests, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
    })
    console.log(response.message)

  } catch (error) {
    console.log(error.message)
  }
}