import React, { useEffect } from "react";
import logo from "../img/sl.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { registerRequest } from "../Methods/authMethod";
import { logout } from "../Methods/authMethod";
import "bootstrap/dist/css/bootstrap.min.css";
import { SureModel } from "../Screens/PopupMsg";
import { SignUp } from "./SignUp";
import { Users } from "./DataGrid";
<<<<<<< HEAD
import {Curfew} from "./CurfewPassGrid"
=======
import {CurfewPasses } from "./CurfewPasses";

>>>>>>> 3add34e79870ba44e4377c7a348676eae1788363
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  Input,
  Modal,
} from "react-bootstrap";
export function WebApp(props) {
  const [navTitle, setNavTitle] = React.useState();
  const [popupSure, setPopupSure] = React.useState(false);
  useEffect(() => {
    document.title = "Admin-" + navTitle;

    // setloginStates(token !== "null");
  }, [navTitle]);

  function logoutHandle() {
    logout(props.setloginStates);
  }

  return (
    <Router>
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark static-top">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            className="container collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <a className="navbar-brand" href="#">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
            {/* <h1>{navTitle}</h1> */}
            {/* <a className="navbar-brand" href="#"><h2>{navTitle}</h2></a> */}

            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link
                    className={navTitle == "User" ? "nav-link h5" : "nav-link"}
                    to="/users"
                  >
                    Users
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={navTitle == "About" ? "nav-link h5" : "nav-link"}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={navTitle == "Home" ? "nav-link h5" : "nav-link"}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      navTitle == "SignUp" ? "nav-link h5" : "nav-link"
                    }
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
<<<<<<< HEAD

                <li className="nav-item">
                  <Link
                    className={
                      navTitle == "Curfew Pass" ? "nav-link h5" : "nav-link"
                    }
                    to="/curfew-pass"
                  >
                    Curfew Pass
=======
                <li className="nav-item">
                  <Link
                    className={
                      navTitle == "CurfewPasses" ? "nav-link h5" : "nav-link"
                    }
                    to="/curfewpass"
                  >
                    Curfew Pass Requests
>>>>>>> 3add34e79870ba44e4377c7a348676eae1788363
                  </Link>
                </li>
              </ul>

              <Button
                size="sm"
                variant="outline-secondary"
                className="nav-item"
                onClick={() => {
                  setPopupSure(true);
                }}
              >
                Sign Out
              </Button>

              <SureModel
                yes={logoutHandle}
                title={"Need to Logout?"}
                okName={"Yes"}
                body={"Bye!!"}
                show={popupSure}
                setShow={setPopupSure}
              />
            </div>
          </div>
        </nav>
        <div style={{ padding: 50 }}>
          <Switch>
            <Route path="/signup">
              <SignUp setNavTitle={setNavTitle} />
            </Route>
            <Route path="/about">
              <About setNavTitle={setNavTitle} />
            </Route>

            <Route path="/curfew-pass">
              <Curfew setNavTitle={setNavTitle} />
            </Route>

            <Route path="/users">
              <Users setNavTitle={setNavTitle} />
            </Route>
            <Route path="/curfewpass">
              <CurfewPasses setNavTitle={setNavTitle} />
            </Route>
            <Route path="/">
              <Home setNavTitle={setNavTitle} />
            </Route>
          </Switch>
        </div>
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


