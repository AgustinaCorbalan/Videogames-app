import React from "react";
import { useDispatch } from "react-redux";
import "./card.css";
import { Link } from "react-router-dom";
import { gameDetail } from "../../actions/index";

export function Card({ game }) {
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="nombre">{game.name}</h3>
            <h5>
              {game.genre
                ? game.genre.map((g) => <p key={g}> {g} </p>)
                : game.genres.map((g) => <p key={g.name}> {g.name} </p>)}
            </h5>
            <p className="rating">Rating: {" " + game.rating}</p>
            <img
              className="img"
              src={game.background_image ? game.background_image : game.image}
              alt=""
              width="330"
              height="190"
            ></img>
          </div>
          <Link to={`/videogame/`} key={game.id}>
            <button onClick={() => dispatch(gameDetail(game.id))}>
              Ver más
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Card;
