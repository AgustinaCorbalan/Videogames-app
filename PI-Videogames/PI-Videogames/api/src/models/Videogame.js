const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //   ID: * No puede ser un ID de un videojuego ya existente en la API rawg
  // Nombre *
  // Descripción *
  // Fecha de lanzamiento
  // Rating
  // Plataformas *
  sequelize.define("Videogame", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
