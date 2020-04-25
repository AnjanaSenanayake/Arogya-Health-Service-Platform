import React from "react";
import logo from "../img/sl.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { registerRequest } from "../Methods/authMethod";
import { logout } from "../Methods/authMethod";
import "bootstrap/dist/css/bootstrap.min.css";

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
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/signup">
            <SignUp setNavTitle={setNavTitle} />
          </Route>
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

function SignUp(props) {
  props.setNavTitle("SignUp");
  const [name, setName] = React.useState("");
  const [nic, setNic] = React.useState("");
  const [posi, setPosi] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [access, setAccess] = React.useState("");
  const [ds, setDs] = React.useState("");
  const [gs, setGs] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [cpw, setCpw] = React.useState("");
  const [smShow, setSmShow] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleNic(e) {
    setNic(e.target.value);
  }

  function handlePosi(e) {
    setPosi(e.target.value);
  }

  function handlePhone(e) {
    setPhone(e.target.value);
  }

  function handleAccess(e) {
    setAccess(e.target.value);
  }

  function handleDs(e) {
    setDs(e.target.value);
  }

  function handleGs(e) {
    setGs(e.target.value);
  }

  function handlePw(e) {
    setPw(e.target.value);
  }

  function handleCpw(e) {
    setCpw(e.target.value);
  }

  function register(e) {
    console.log(name);
    console.log(nic);
    console.log(posi);
    console.log(phone);
    console.log(access);
    console.log(ds);
    console.log(gs);
    console.log(pw);
    console.log(cpw);
    if(pw != cpw){
      setMsg("Password is not matching");
      setSmShow(true);
    }else if(name == "" || nic == "" ){
      setMsg("Please fill the required fields");
      setSmShow(true);
    }else{
      registerRequest(name,nic,posi,phone,access,ds,gs,pw);
    }
    
  }

  return (
    <div>
      <div className="container">
        <h1 className="mt-4">Register new account</h1>
        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              onChange={handleName}
              value={name}
            ></input>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>-</Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>NIC number</label>
            <input
              type="text"
              placeholder="NIC number"
              className="form-control"
              onChange={handleNic}
              value={nic}
            ></input>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>Position</label>
            <input
              type="text"
              placeholder="Position"
              className="form-control"
              onChange={handlePosi}
              value={posi}
            ></input>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Phone number"
              className="form-control"
              onChange={handlePhone}
              value={phone}
            ></input>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>Access Level</label>
            <select
              className="form-control"
              onChange={handleAccess}
              value={access}
            >
              <option value="0">Full Access</option>
              <option value="1">Divisional Secreterite Access</option>
              <option value="2">Grama Niladhari Access</option>
            </select>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>DS Division</label>
            <input
              type="text"
              placeholder="DS Division"
              className="form-control"
              disabled={access == 0}
              onChange={handleDs}
              value={ds}
            ></input>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>GS Division</label>
            <input
              type="text"
              placeholder="GS Division"
              className="form-control"
              disabled={access != 2}
              onChange={handleGs}
              value={gs}
            ></input>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={handlePw}
              value={pw}
            ></input>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={handleCpw}
              value={cpw}
            ></input>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <Button type="button" onClick={register}>
              Login
            </Button>
          </Col>
          <Col></Col>
        </Row>

        <Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Small Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{msg}</Modal.Body>
        </Modal>
      </div>
    </div>
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
