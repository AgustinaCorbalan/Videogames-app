import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postGame, getGenres } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./add.css";

export default function createGame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const [input, setInput] = useState({
    name: "",
    description: "",
    release: "",
    rating: 0,
    platform: "",
    genres: [], // guardo en un array para que pueda crear mas de uno.
  });

  function handleOnChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }

  function handleOnCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        genres: e.target.value,
      });
    }
  }

  useEffect(() => {
    dispatch(getGenres()); // apenas se monta el componente, despacha la accion que trae los genres
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1 className="create">Create your own game!</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={input.name}
            name="name"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={input.description}
            onChange={(e) => handleOnChange(e)}
          ></textarea>
        </div>
        <div>
          <label htlmlFor="release">Release:</label>
          <input
            type="tex"
            id="release"
            name="release"
            value={input.release}
            onChange={(e) => handleOnChange(e)}
          ></input>
        </div>
        <div>
          <label htmlFor="rating"> Rating: </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={input.rating}
            min="0"
            max="5"
            step="0.01"
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        {genres.map((gen) => (
          <div className="checkbox">
            <label htmlFor={gen.id}>{gen.name}</label>
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="generos"
                  id={gen.id}
                  value={gen.id}
                  key={gen.id}
                  onChange={(e) => handleOnCheck(e)}
                ></input>
              </li>
            </ul>
          </div>
        ))}
        <div></div>
        <button type="submit"> CREATE YOUR GAME </button>
      </form>
    </div>
  );
}
