const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
  filterGenre: [],
  newGame: [],
  page: 1,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_GAMES":
      return {
        ...state,
        page: 1,
        videogames: action.payload,
        filterGenre: action.payload,
        allVideogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        page: 1,
        genres: action.payload,
      };
    case "GET_NAMES":
      return {
        ...state,
        page: 1,
        videogames: action.payload,
      };
    case "GAME_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "POST_GAME":
      return {
        ...state,
        newGame: action.payload,
      };

    case "FILTER_GENRES":
      const genreFilter =
        action.payload === "All"
          ? state.filterGenre
          : state.filterGenre.filter((e) => {
              for (let i = 0; i < e.genres.length; i++) {
                if (e.genres[i].name === action.payload) {
                  return true;
                }
              }
              return undefined;
            });
      return {
        ...state,
        page: 1,
        videogames: genreFilter,
      };

    case "FILTER_CREATED":
      const filtered =
        action.payload === "created"
          ? state.allVideogames.filter((m) => m.mine)
          : state.allVideogames.filter((m) => !m.mine);
      return {
        ...state,
        videogames: action.payload === "All" ? state.allVideogames : filtered,
      };
    case "ORDER_NAME":
      let sortedGames =
        action.payload === "asc"
          ? [...state.allVideogames].sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : [...state.allVideogames].sort(function (a, b) {
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
        videogames: sortedGames,
      };
    case "ORDER_RATING":
      const ratingFilter =
        action.payload === "max"
          ? [...state.allVideogames].sort((b, a) => a.rating - b.rating)
          : [...state.allVideogames].sort((b, a) => b.rating - a.rating);
      return {
        ...state,

        videogames: ratingFilter,
      };
    case "PAGE":
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
