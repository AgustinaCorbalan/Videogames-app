import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNames } from "../../actions/index";
import "./SearchBar.css";

export default function searchBar() {
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  function handleOnChange(e) {
    e.preventDefault();
    setState(e.target.value); // capturo el valor de ese input
    console.log(state);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(getNames(state)); // despacha la action getNames a ese valor de state (lo que escribe el user)
    setState(" ");
  }

  return (
    <div className="info">
      <input
        className="change"
        type="text"
        placeholder="Search..."
        value={state}
        onChange={(e) => handleOnChange(e)}
      ></input>
      <button className="hi" type="submit" onClick={(e) => handleOnSubmit(e)}>
        🔍
      </button>
    </div>
  );
}
