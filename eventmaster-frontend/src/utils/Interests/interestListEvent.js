import fetchInterestsFromDB from "./fetchInterestsFromDB.js";

export default async function interestListEvents() {
  try {
    const interests = await fetchInterestsFromDB()

    const interestsWithUserOnes = interests.data.map((interest) => (
        { ...interest, marcado: false }
        )  
    )

    return interestsWithUserOnes
  } catch (error) {
    console.log(error.message)
  }
}