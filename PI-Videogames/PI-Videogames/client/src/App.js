import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/index";
import Home from "./components/Home/index";
import CreateGame from "./components/AddGame/CreateGame";
import Detail from "./components/Detail/DetailGame";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* <NavBar /> */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/videogames" component={CreateGame} />
          <Route exact path="/videogames/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
