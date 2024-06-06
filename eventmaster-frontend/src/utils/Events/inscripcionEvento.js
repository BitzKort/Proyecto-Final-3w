import axios from "axios";

export default async function inscripcionEvento(codigo_evento) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/evento/inscribirse",
      { codigo_evento: codigo_evento },
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