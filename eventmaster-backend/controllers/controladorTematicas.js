const { pool } = require("../api/db.js");

const getTematicas = async (req, res) => {
  try {

    const query = "select * from tematica"

    const tematicas = await pool.query(query);

    res.status(200).json(tematicas);

  } catch (error) {
    console.error("Error al realizar la solicitud de tematicas:", error);
    res.status(500).json({ mensaje: "Error al obtener los datos de tematicas" });
  }
}

module.exports = {
  getTematicas: getTematicas,
}