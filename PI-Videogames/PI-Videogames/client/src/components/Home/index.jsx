import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pageUno,
  getGames,
  filterByGenres,
  orderByName,
  getGenres,
  filterByCreated,
  orderByRating,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Card from "../CardGames/Card";
import Paginated from "../Paginado/Paginated";
import SearchBar from "../Search/SearchBar";
import "./home.css";

export default function Home() {
  const dispatch = useDispatch(); // es lo mismo que mapDispatch, despacha la action
  const allGames = useSelector((state) => state.videogames);
  const pages = useSelector((state) => state.page);

  //console.log(allGames, "HOLA");
  const genre = useSelector((state) => state.genres); // es lo mismo que mapStateToProps, con useSelec guarda en allGames todo el state de videogames
  // const [currentPage, setCurrentPage] = useState(1);
  const generos = useSelector((state) => state.allVideogames);
  const [gamePerPage, setGamePerPage] = useState(9);
  const [order, setOrder] = useState(""); // declaro un state vacio para que cuando seteo la pagina 1 modifique el state y se renderice
  const lastGame = pages * gamePerPage;
  const firstGame = lastGame - gamePerPage;
  const currentGames = allGames.slice(firstGame, lastGame);
  const [genresGames, setGenresGames] = useState("");
  const paged = (pageNumber) => {
    dispatch(pageUno(pageNumber));
  };
  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
  }, []); // evita un loop infinito, (dependecias)

  function handleOnCreated(e) {
    dispatch(filterByCreated(e.target.value));
  }

  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getGames());
  }
  function handleFilterGenre(e) {
    setGenresGames(e.target.value);
    //console.log(genresGames, "ACAAA");
    dispatch(filterByGenres(e.target.value)); // toma como payload el valor de cada genre(que clickea el user)
    console.log(generos, "HOLAAAAAA");
  }

  function handleName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    //setCurrentPage(pages); // empieza desde la pagina 1 a ordenar
    setOrder(e.target.value);
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    // empieza desde la pagina 1 a ordenar
    setOrder(e.target.value); // setea el ordenamiento segun el value que le pasó el user.
    dispatch(orderByRating(e.target.value));
  }

  return (
    <div>
      <Link to="/videogames" className="Create">
        {" "}
        Create Game{" "}
      </Link>
      <h1 className="home"> VIDEOGAMES !!! </h1>
      <button
        className="boton"
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        RESET GAMES 🎮
      </button>
      <SearchBar></SearchBar>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="max"> 😍 </option>
          <option value="min"> 🥱 </option>
        </select>
        <select onChange={(e) => handleName(e)}>
          <option value="asc">ASCENDING</option>
          <option value="desc">DESCENDING</option>
        </select>
        <select onChange={(e) => handleFilterGenre(e)}>
          <option value="All"> ALL GENRES </option>
          {genre &&
            genre.map((g) => (
              <option key={g.name} value={g.name}>
                {g.name}
              </option>
            ))}
        </select>
        <select onChange={(e) => handleOnCreated(e)}>
          <option value="All">ALL</option>
          <option value="created">CREATED</option>
          <option value="exist"> EXISTENTE</option>
        </select>
        <Paginated
          gamePerPage={gamePerPage}
          allGames={allGames.length}
          paged={paged}
        />
        {currentGames?.map((e, index) => {
          // le pregunto si hay AllGames, (tiene el estado global con todos los juegos) y desp por cada juego le paso un card con cada prop que quiero renderizar
          return <Card className="card" key={index} game={e} />;
        })}
      </div>
    </div>
  );
}
