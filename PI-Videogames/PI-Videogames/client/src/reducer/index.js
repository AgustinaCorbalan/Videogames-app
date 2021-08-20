const initialState = {
  videogames: [],
  genres: [],
  allVideogames: [],
  detail: [],
  games: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_GAMES":
      return {
        ...state,
        videogames: action.payload, // en el state videogames, manda todo lo que mande la action GET_GAMES
        allVideogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_NAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GAME_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "POST_GAME":
      return {
        // devuelve el state como está por que voy a crear en una ruta nueva
        ...state,
      };
    case "FILTER_GENRES":
      const allGames = state.allVideogames; // me traigo el estado de videogames que va a tener todos los juegos
      const genresFilter =
        action.payload === "All"
          ? allGames
          : allGames.filter((g) => g.genres.includes(action.payload));
      console.log(genresFilter);
      console.log(action.payload);
      // entra a allgames y filtra por el payload que te llega(cada genre del back)
      return {
        ...state,
        games: genresFilter,
      };

    case "FILTER_CREATED":
      const filtered =
        action.payload === "created"
          ? allGames.filter((m) => m.mine)
          : allGames.filter((m) => !m.mine);
      return {
        ...state,
        videogames: action.payload === "All" ? allGames : filtered,
      };
    case "ORDER_NAME":
      const orderName =
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: orderName,
      };
    default:
      return state;
  }
}

export default reducer;
