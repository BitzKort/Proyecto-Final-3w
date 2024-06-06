import axios from "axios";

export default async function anularInscripcionEvento(codigo_evento) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/evento/anular-inscripcion",
      { codigo_evento },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}