import axios from "axios";

export default async function modifyUserData(formData) {
  try {
    const response = await axios.put('http://localhost:5000/api/perfil/modificar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('token')
      }
    })

    console.log(response.message)
  } catch (error) {
    console.log(error.message)
  }
}