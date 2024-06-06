const { sequelize } = require('../api/db.js');
const { DataTypes } = require('sequelize');

const tematica = sequelize.define('tematica', {
  codigo_tematica: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false
});

module.exports = tematica;