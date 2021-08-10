//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("dotenv").config();
const { API_KEY } = process.env;
const server = require("./src/app.js");
const { conn, Genre } = require("./src/db.js"); // la conexion es el new Sequelize, precargo los generos
const axios = require("axios");

conn.sync({ force: true }).then(async () => {
  const apiGenres = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}` //
  );
  let genresApi = apiGenres.data.results; // creo una var Genres, donde me guardo los genres de la api que están en results
  genresApi = genresApi.map((genres) => {
    // en Genres quiero que me guarde todos los nombres.
    return {
      // devuelve un obj que tiene una prop name que es el nombre del genero
      name: genres.name,
    };
  });
  //console.log(genresApi);
  await Genre.bulkCreate(genresApi); // a partir de la transformacion que hice en la variable donde tengo guardado los generos bulkcreate los crea
  // y espera recibir un array de objetos que tenga la prop nombre
  console.log("base de datos conectada");

  server.listen(3001, () => {
    // una vez que termina de ejecutar, la conexion, empieza a escuchar en ese puerto
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
