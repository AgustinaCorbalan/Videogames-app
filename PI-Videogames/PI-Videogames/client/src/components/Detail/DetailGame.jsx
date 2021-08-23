import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { gameDetail, clean } from "../../actions/index";

import "./Detail.css";

export default function detailGame() {
  const videogamesDetails = useSelector((state) => state.detail);
  console.log(videogamesDetails, "ENTRE SOY DETAIL");

  return (
    <div>
      {videogamesDetails && videogamesDetails ? (
        <div className="container">
          <div className="color">
            <h1>{videogamesDetails.name && videogamesDetails.name}</h1>
            <div>
              {console.log(videogamesDetails.name)}
              <img
                className="img"
                src={videogamesDetails.image}
                alt="There is no image"
              ></img>
              {console.log(videogamesDetails.image)}
            </div>
            <div className="rel">
              <h2></h2>
              {videogamesDetails.description}
              {console.log(videogamesDetails.description)}
            </div>
            <div>
              {console.log(videogamesDetails.release)}
              <h2>Released</h2>
              <p>{videogamesDetails.release}</p>
            </div>
            <div>
              <h2>Genres</h2>
              {videogamesDetails.genre?.map((g, index) => (
                <p key={index}> {g} </p>
              ))}
              {console.log(videogamesDetails.genre)}
            </div>
            {videogamesDetails.genres?.map((g, index) => (
              <p key={index}> {g.name} </p>
            ))}
            {console.log(videogamesDetails.genres)}
            <div>
              <h2>Platforms</h2>
              <div>
                <h4> {videogamesDetails.platform} </h4>
              </div>
            </div>
            <div>
              {console.log(videogamesDetails.rating)}
              <h2>Rating</h2>
              <p>{videogamesDetails.rating}</p>
            </div>
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
