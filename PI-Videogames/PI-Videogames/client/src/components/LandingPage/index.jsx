import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function landingPage() {
  return (
    <div>
      <h1 className="landing"> Are you ready to...? </h1>
      <Link to="/home">
        <button className="button"></button>
      </Link>
    </div>
  );
}
