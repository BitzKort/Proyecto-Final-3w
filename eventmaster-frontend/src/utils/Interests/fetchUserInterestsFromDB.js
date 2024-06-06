import axios from "axios";

export default async function fetchUserInterestsFromDB() {
  try {
    const userInterests = await axios.get('http://localhost:5000/api/persona/intereses/consultar', {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    return userInterests
  } catch (error) {
    console.log(error.message)
  }
}