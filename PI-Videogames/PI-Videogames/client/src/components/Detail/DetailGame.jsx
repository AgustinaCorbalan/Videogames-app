import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gameDetail, clean } from "../../actions/index";

import "./Detail.css";

export default function detailGame() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gameDetail(id));
    return () => {
      dispatch(clean());
    };
  }, [dispatch, id]);

  const videogamesDetails = useSelector((state) => state.detail);
  console.log(videogamesDetails, "ENTRE SOY DETAIL");

  return (
    <div>
      {videogamesDetails && videogamesDetails ? (
        <div className="color">
          <h1>{videogamesDetails.name && videogamesDetails.name}</h1>
          <div>
            <img
              className="img"
              src={videogamesDetails.image}
              alt="There is no image"
            ></img>
          </div>
          <div className="rel">
            <h2></h2>
            {videogamesDetails.description}
          </div>
          <div>
            <h2>Released</h2>
            <p>{videogamesDetails.release}</p>
          </div>
          <div>
            <h2>Genres</h2>
            {videogamesDetails.genre &&
              videogamesDetails.genre.map((g) => {
                return <p key={g}>{g}</p>;
              })}
          </div>
          <div>
            <h2>Platforms</h2>
            <p>
              {videogamesDetails.platform &&
                videogamesDetails.platform.map((p) => p)}
            </p>
          </div>
          <div>
            <h2>Rating</h2>
            <p>{videogamesDetails.rating}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>BACK</button>
      </Link>
    </div>
  );
}
