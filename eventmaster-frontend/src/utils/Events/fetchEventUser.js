import axios from 'axios'

export default async function fetchEventUser(codigo_evento) {
  try {
    const lista_participantes = await axios.post('http://localhost:5000/api/evento/participantes', { codigo_evento }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
    })
    return lista_participantes
  } catch (error) {
    console.log(error.message)
  }
}