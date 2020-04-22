import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Row, Col, Container, Form,Input } from 'react-bootstrap';
function App() {

  const [loginStates, setloginStates] = React.useState(null);
  if (loginStates == null) {
    return (
      <div className="App">
        <header className="App-header" >
          <LoginForm setloginStates={setloginStates}></LoginForm>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header" >

        </header>
      </div>
    );
  }

}


function LoginForm() {

  const [nic, setNic] = React.useState('');
  const [pw, setPw] = React.useState('');

  function handleNic(e){
    setNic(e.target.value);

  }
  function handlePw(e){
    setPw(e.target.value);
  }

  function login(e) {
    console.log(nic);
    console.log(pw);
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
    // <Container className="align-self-center">
    //   <Row>
    //     <Col ></Col>

    //     <Col xs={4}>
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <div>
    //         <input type='text'></input>
    //         <input type='text'></input>

    //       </div>
    //       {/* <Form onSubmit={(e) => login(e)}>
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <Form.Group controlId="formBasicEmail">

    //           <Form.Control type="text" placeholder="Enter NIC" />
    //           <Form.Text className="text-muted">
    //             We'll never share your infomation with anyone else.
    //         </Form.Text>
    //         </Form.Group>

    //         <Form.Group controlId="formBasicPassword">

    //           <Form.Control type="password" placeholder="Password"/>
    //         </Form.Group>

    //         <Button variant="primary" type="submit">
    //           Login
    //         </Button>
    //       </Form> */}
    //     </Col>
    //     <Col></Col>
    //   </Row>
    // </Container>
  )
}

export default App;
