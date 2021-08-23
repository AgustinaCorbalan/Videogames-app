import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postGame, getGenres } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./add.css";

export default function createGame() {
  const history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const [input, setInput] = useState({
    name: "",
    description: "",
    release: "",
    image: "",
    rating: 0,
    platform: [],
    genres: [], // guardo en un array para que pueda crear mas de uno.
  });

  const platforms = [
    "PlayStation",
    "PlayStation-2",
    "PlayStation-3",
    "PlayStation-4",
    "PlayStation-5",
    "PC",
    "iOS",
    "Android",
    "macOS",
    "Xbox",
    "Nintendo",
    "Atari",
    "Genesis",
  ];

  function handleOnChange(e) {
    if (e.target.name === "genres" || e.target.name === "platform") {
      const GenresPlatforms = input[e.target.name];
      setInput({
        ...input,
        [e.target.name]: GenresPlatforms.concat(e.target.value),
      }); // Su nuevo State es el array con la info
    } else {
      setInput({ ...input, [e.target.name]: e.target.value }); // Sino setea lo que haya
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(input, "ACAAAAAAAAAA");
    history.push("/videogames");

    const formGames = {
      name: input.name,
      description: input.description,
      release: input.release,
      rating: input.rating,
      platform: input.platform,
      genres: input.genres,
      image: input.image,
    };

    if (!formGames.name) {
      alert("You forgot to name your game!! 🙄");
      return;
    }
    if (!formGames.description) {
      alert("What’s your game about?");
      return;
    }

    dispatch(postGame(formGames));
    e.target.reset();
    alert("Videogame created!");

    setInput({
      name: "",
      description: "",
      image: "",
      releaseDate: "",
      rating: 0,
      genres: [],
      platforms: [],
    });
  }

  useEffect(() => {
    dispatch(getGenres()); // apenas se monta el componente, despacha la accion que trae los genres
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <div className="deco">
        <h1 className="create">Create your own game!</h1>
        <form
          onChange={(e) => handleOnChange(e)}
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <div>
            <label className="name" htmlFor="name">
              Name:
            </label>
            <input type="text" id="name" value={input.name} name="name" />
          </div>
          <div>
            <label className="description" htmlFor="description">
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              value={input.description}
            ></textarea>
          </div>
          <div>
            <label className="release" htlmlFor="release">
              Release:
            </label>
            <input
              type="text"
              id="release"
              name="release"
              value={input.release}
            ></input>
          </div>
          <div>
            <label className="rating" htmlFor="rating">
              {" "}
              Rating:{" "}
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={input.rating}
              min="0"
              max="5"
              step="0.01"
            />
          </div>
          <div className="plat">
            <label htmlFor="platform">
              <strong className="strong"> Platforms </strong>
            </label>
            {platforms.map((p) => (
              <div className="checkbox" key={p}>
                <input
                  className="inputCreate"
                  type="checkbox"
                  name="platform"
                  value={p}
                ></input>
                <label name={p}> {p} </label>
              </div>
            ))}
          </div>

          <div className="genres">
            <label htmlFor="genres">
              <strong> Genres </strong>
            </label>
            <div className="checkbox">
              {genres.map((g) => (
                <div className="inputGenre" key={g.name}>
                  <input
                    className="inputCreate"
                    type="checkbox"
                    name="genres"
                    value={g.id}
                  ></input>
                  <label name={g.name}> {g.name} </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="image"> Image </label>
            <input
              className="inputCreate"
              type="text"
              name="image"
              value={input.image}
            />
          </div>
          <button onSubmit={(e) => handleOnSubmit(e)} type="submit">
            {" "}
            CREATE YOUR GAME{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
