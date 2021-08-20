import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
  const genre = useSelector((state) => state.genres); // es lo mismo que mapStateToProps, con useSelec guarda en allGames todo el state de videogames
  const [currentPage, setCurrentPage] = useState(1);
  const [gamePerPage, setGamePerPage] = useState(9);
  const [order, setOrder] = useState(""); // declaro un state vacio para que cuando seteo la pagina 1 modifique el state y se renderice
  const lastGame = currentPage * gamePerPage;
  const firstGame = lastGame - gamePerPage;
  const currentGames = allGames.slice(firstGame, lastGame);

  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // es lo mismo que mapDispatch, despacha la action, que me va a traer todos los juegos
    // useEffect equivale a los tres ciclos de vida del componente. apenas se monta el componente renderiza los juegos.
    dispatch(getGames());
    dispatch(getGenres());
  }, []); // evita un loop infinito, (dependecias)

  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getGames());
  }
  function handleFilterGenre(e) {
    dispatch(filterByGenres(e.target.value));
    console.log(filterByGenres(e.target.value), "acaaa"); // toma como payload el valor de cada genre(que clickea el user)
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); // empieza desde la pagina 1 a ordenar
    setOrder(e.target.value); // setea el ordenamiento segun el value que le pasó el user.
    dispatch(orderByRating(e.target.value));
  }

  return (
    <div>
      <Link to="/videogames"> Create Game </Link>
      <h1 className="home"> VIDEOGAMES !!! </h1>
      <button
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        CARGAR JUEGOS
      </button>
      <SearchBar></SearchBar>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="rating">Rating</option>
        </select>
        <select onChange={(e) => handleSort(e)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select onChange={(e) => handleFilterGenre(e)}>
          <option value="All"> All </option>
          {genre && genre.map((g) => <option value={g.name}>{g.name}</option>)}
        </select>
        <select>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="exist"> Existente</option>
        </select>
        <Paginated
          gamePerPage={gamePerPage}
          allGames={allGames.length}
          paged={paged}
        />
        {currentGames?.map((e) => {
          // le pregunto si hay AllGames, (tiene el estado global con todos los juegos) y desp por cada juego le paso un card con cada prop que quiero renderizar
          return (
            <>
              {/* <Link to={"/home/" + e.id}> */}
              <Card
                className="card"
                name={e?.name}
                image={e?.background_image}
                genre={e?.genre}
                id={e?.id}
                rating={e?.rating}
              />
              {/* </Link> */}
            </>
          );
        })}
      </div>
    </div>
  );
}
