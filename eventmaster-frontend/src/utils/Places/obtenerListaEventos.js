import axios from 'axios'

export default async function obtenerListaEventos(codigo_lugar) {
  try {
    const lista_eventos_lugar = await axios.post('http://localhost:5000/api/evento/evento-lugar/lista', { codigo_lugar }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
    })
    return lista_eventos_lugar
  } catch (error) {
    console.log(error.message)
  }
}