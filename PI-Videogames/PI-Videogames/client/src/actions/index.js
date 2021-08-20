import axios from "axios";

export function getGames() {
  return async function (dispatch) {
    var response = await axios.get("http://localhost:3001/videogames?name=");
    dispatch({
      type: "GET_GAMES",
      payload: response.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    var response = await axios.get("http://localhost:3001/genre");
    dispatch({
      type: "GET_GENRES",
      payload: response.data,
    });
    //console.log(response.data, "HOLAAAAA");
  };
}

export function clean() {
  return {
    type: "GAME_DETAIL",
    payload: [],
  };
}

export function getNames(name) {
  return async function (dispatch) {
    try {
      var response = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      ); // desp del igual, pasame lo que te llega por payload osea lo que el usuario pasa
      dispatch({
        type: "GET_NAMES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByGenres(payload) {
  return {
    type: "FILTER_GENRES",
    payload, // va a ser el value que me llega desde el back
  };
}

export function filterByCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_NAME",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_RATING",
    payload,
  };
}

export function postGame(payload) {
  return async function () {
    const response = await axios.post(
      "http://localhost:3001/videogames",
      payload
    );
    return response;
  };
}

export function gameDetail(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        "http://localhost:3001/videogames/" + id
      );
      // var detail = {
      //   image: response.data.image,
      //   //name: response.data.name,
      //   description: response.data.description,
      //   release: response.data.release,
      //   genre: response.data.genre && response.data.genre.map((g) => g),
      //   platform: response.data.platform.map((p) => p),
      //   rating: response.data.rating,
      // };
      // console.log(detail, "ACAAAAA");
      return dispatch({
        type: "GAME_DETAIL",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
