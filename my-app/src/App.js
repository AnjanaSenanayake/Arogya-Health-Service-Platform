import React, { useEffect } from "react";
import logo from "./img/sl.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Row, Col, Container, Form, Input,Modal } from "react-bootstrap";
import { loginRequest } from "./Methods/authMethod";
import { WebApp } from "./Screens/HomeScreen";

function App() {
  const [userData, setUserData] = React.useState(null);
  const [loginStates, setloginStates] = React.useState(null);
  const [failedMsg, setFailedMsg] = React.useState('Something went wrong :(');
  let token;

  useEffect(() => {
    document.title = "Web App - Administrators";
    const token = localStorage.getItem("token");
    // console.log(,token)
    if(token != 'null'){
      setloginStates(true)
    }
    console.log("Token", token);
    // setloginStates(token !== "null");
  }, []);

 
  if (loginStates == null) {
    console.log('state',loginStates)
    //login
    return (
      <div className="App">
        <header className="App-header">
          <LoginForm
            setFailedMsg={setFailedMsg}
            setloginStates={setloginStates}
            setUserData={setUserData}
          ></LoginForm>
        </header>
      </div>
    )
  } if (loginStates == true) {
    //loged
    return (
      <WebApp
        setloginStates={setloginStates}
        loginStates={loginStates}
        setUserData={userData}
      ></WebApp>
    );
  } else {
    //error
    return (
      <div className="App">
        <header className="App-header">
          <p>{failedMsg}</p>
          <Button
            onClick={() => {
              setloginStates(null);
            }}
          >
            Back
          </Button>
        </header>
      </div>
    );
  }
}

function LoginForm(props) {
  const [nic, setNic] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [smShow,setSmShow] = React.useState(false);
  const [msg,setMsg] = React.useState("");
  const [help,setHelp] = React.useState(false);
  function handleNic(e) {
    setNic(e.target.value);
  }
  function handlePw(e) {
    setPw(e.target.value);
  }

  function login(e) {
    console.log(nic);
    console.log(pw);
    if( nic ==='' || pw ===''){
      setMsg('Password and NIC can not be emty.')
      setSmShow(true)
    }else{
      loginRequest(nic, pw, props.setloginStates, props.setUserData, props.setFailedMsg);
    }
  }

  return (
    <Container className="container">
      <img src={logo} className="App-logo" alt="logo" />
      <Row className="row">
        <Col className="font-weight-light"><h2>{'Welcome to Arogya'}</h2></Col>
      </Row>
      <br></br>
      <Row className="row">
        <Col></Col>
        <Col xs={4} className="font-weight-light">
          {"National ID Card number"}
          <input
            type="text"
            placeholder="987654321V"
            className="form-control"
            onChange={handleNic}
            value={nic}
          ></input>
        </Col>
        <Col></Col>
      </Row>
      <Row className="row">
        <Col></Col>
      </Row>
      <Row className="row">
        <Col></Col>
        <Col xs={4} className="font-weight-light">
          {"Password"}
          <input
            type="password"
            placeholder="P@R5W0r6"
            className="form-control"
            onChange={handlePw}
            value={pw}
          ></input>
        </Col>
        <Col></Col>
      </Row>
      <br></br>
      <Row className="row">
        <Col></Col>
        <Col xs={6} className="font-weight-light">
         
          <Button type="button"  size="lg" variant="outline-success" onClick={login}>
            Enter 
          </Button>
          
        </Col>
        <Col>
       
        </Col>
      </Row>
      <br></br>
      <br></br>
      <Row>
        <Col>
        <Button type="button" size="sm" variant="outline-secondary" onClick={()=>{setHelp(true)}}>
            Help me!! 
          </Button>
        </Col>
      </Row>

      <Modal
            size="md"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Login Error
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{msg}</Modal.Body>
          </Modal>

          <Modal
           
            show={help}
            onHide={() => setHelp(false)}
            // aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-md">
                You are in Admin / Management web of qwert qwrr
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>Insert your login infomation, for reset your password. please contact your organization Admin</Modal.Body>
          </Modal>

    </Container>
  );
}

export default App;
