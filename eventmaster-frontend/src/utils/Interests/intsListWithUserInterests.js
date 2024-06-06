import fetchInterestsFromDB from "./fetchInterestsFromDB.js";
import fetchUserInterestsFromDB from "./fetchUserInterestsFromDB.js";

export default async function intsListWithUserInterests() {
  try {
    const interests = await fetchInterestsFromDB()
    const userInterests = await fetchUserInterestsFromDB()

    const userInterestsCodes = userInterests.data.rows.reduce((arrayCodes, interest) => {
      arrayCodes.push(interest.codigo_interes)
      return arrayCodes
    }, [])

    const interestsWithUserOnes = interests.data.map((interest) => (
      userInterestsCodes.includes(interest.codigo_interes) ?
        { ...interest, marcado: true } :
        { ...interest, marcado: false }
    ))

    return interestsWithUserOnes
  } catch (error) {
    console.log(error.message)
  }
}