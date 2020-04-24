import React from "react";
import logo from "../img/sl.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { logout } from "../Methods/authMethod";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Row, Col, Container, Form, Input } from "react-bootstrap";
export function WebApp(props) {
  const [navTitle, setNavTitle] = React.useState();
  function logoutHandle() {
    logout(props.setloginStates);
  }
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
            <a>{navTitle}</a>
            <Button className="nav-item" onClick={logoutHandle}>
              Logout
            </Button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/about">
            <About setNavTitle={setNavTitle} />
          </Route>
          <Route path="/users">
            <Users setNavTitle={setNavTitle} />
          </Route>
          <Route path="/">
            <Home setNavTitle={setNavTitle} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(props) {
  props.setNavTitle("Home");
  return (
    <div>
      <div className="container">
        <h1 className="mt-4">Home Screen</h1>
        <p>
          The logo in the navbar is now a default Bootstrap feature in Bootstrap
          4! Make sure to set the width and height of the logo within the HTML
          or with CSS. For best results, use an SVG image as your logo.
        </p>
      </div>
    </div>
  );
}

function About(props) {
  props.setNavTitle("About");
  return (
    <div>
      <div className="container">
        <h1 className="mt-4">About Screen</h1>
        <p>
          The logo in the navbar is now a default Bootstrap feature in Bootstrap
          4! Make sure to set the width and height of the logo within the HTML
          or with CSS. For best results, use an SVG image as your logo.
        </p>
      </div>
    </div>
  );
}

function Users(props) {
  function print() {
    console.log(props);
  }
  props.setNavTitle("User");

  return (
    <div>
      <div className="container">
        <h1 className="mt-4">User Management Screen</h1>
        <Button onClick={print}></Button>
        <p>
          The logo in the navbar is now a default Bootstrap feature in Bootstrap
          4! Make sure to set the width and height of the logo within the HTML
          or with CSS. For best results, use an SVG image as your logo.
        </p>
      </div>
    </div>
  );
}
