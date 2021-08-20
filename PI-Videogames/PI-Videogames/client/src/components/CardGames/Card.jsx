import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

function Card({ name, image, genre, id, rating }) {
  // console.log(id, "SOY ID");
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div>
            <h3>{name}</h3>
            <h5>{genre}</h5>
            <p className="rating">Rating: {" " + rating}</p>
            <img
              className="img"
              src={image}
              alt=""
              width="330"
              height="190"
            ></img>
          </div>
          <div className="link">
            <Link to={`/videogames/${id}`}> Read more</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
