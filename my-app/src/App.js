import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Row, Col, Container, Form, Input } from 'react-bootstrap';
import { loginRequest } from './Methods/authMethod'
import { WebApp } from './Screens/HomeScreen'



function App() {
  const [userData, setUserData] = React.useState(null);
  const [loginStates, setloginStates] = React.useState(null);

  if (loginStates == null) {
    return (
      <div className="App">
        <header className="App-header" >
          <LoginForm setloginStates={setloginStates} setUserData={setUserData}></LoginForm>
        </header>
      </div>
    );
  } else if (loginStates == false) {
    return (
      <div className="App">
        <header className="App-header" >
          <p>NIC or Password doesn't match</p>
          <Button onClick={()=>{setloginStates(null)}}>Back</Button>
        </header>
      </div>
    )
  } else if (loginStates) {
    return (
      <WebApp loginStates={loginStates} setUserData = {userData}></WebApp>
    );
  }

}


function LoginForm(props) {

  const [nic, setNic] = React.useState('');
  const [pw, setPw] = React.useState('');

  function handleNic(e) {
    setNic(e.target.value);

  }
  function handlePw(e) {
    setPw(e.target.value);
  }

  function login(e) {
    console.log(nic);
    console.log(pw);
    loginRequest(nic, pw,props.setloginStates,props.setUserData);
  }

  return (
    <Container className='container'>
      <img src={logo} className="App-logo" alt="logo" />
      <Row>
        <Col></Col>
        <Col xs={6}> <input type='text' placeholder='NIC' className="form-control" onChange={handleNic} value={nic}></input></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          -
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={6}> <input type='password' placeholder='Password' className="form-control" onChange={handlePw} value={pw}></input></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={6}> <Button type='button' onClick={login}>Login</Button></Col>
        <Col></Col>
      </Row>

    </Container>
  )
}

export default App;
