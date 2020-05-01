import React, { useEffect } from "react";
import logo from "../img/sl.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { registerRequest, authRequest } from "../Methods/authMethod";
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

export function SignUp(props) {
  props.setNavTitle("SignUp");
  const [name, setName] = React.useState("");
  const [nic, setNic] = React.useState("");
  const [posi, setPosi] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [access, setAccess] = React.useState("");
  const [ds, setDs] = React.useState();
  const [gs, setGs] = React.useState();
  const [pw, setPw] = React.useState();
  const [cpw, setCpw] = React.useState();
  const [smShow, setSmShow] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [districtSet, setDistrictSet] = React.useState();
  const [districtid, setDistrictId] = React.useState();
  const [refresh, dorefresh] = React.useState();
  const [dsdata, setDsData] = React.useState();
  const [gndata, setGnData] = React.useState();
  const [response, setResponse] = React.useState();
  var data;

  useEffect(() => {
    //document.title = "Admin-" + props.navTitle;
    console.log(props);
    authRequest("getAllDistricts", {}, setDistrictSet);
    // authRequest("getUserByUID",{},setDataSet);
  }, [refresh]);

  useEffect(() => {
    console.log(districtSet?.data);
    //authRequest("getDSByDistrict", { DistrictID: 1 }, setDsData);
  }, [districtSet]);

  useEffect(() => {
    console.log(dsdata?.data);
    //authRequest("getGNByDivision", { DSID:1 }, setGnData);
  }, [dsdata]);

  useEffect(() => {
    console.log(gndata?.data);
  }, [gndata]);

  useEffect(() => {
    console.log(response?.data);
    if (response?.data) {
      setMsg(response?.data);
      setSmShow(true);
    }
  }, [response]);

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

  function handleDistrict(e) {
    setDistrictId(e.target.value);
    console.log(districtid);
    authRequest("getDSByDistrict", { DistrictID: e.target.value }, setDsData);
    console.log(dsdata);
  }

  function handleDs(e) {
    setDs(e.target.value);
    authRequest("getGNByDivision", { DSID: e.target.value }, setGnData);
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
    if (pw != cpw) {
      setMsg("Password is not matching");
      setSmShow(true);
    } else if (name == "" || nic == "" || posi == "" || access == "") {
      setMsg("Please fill the required fields");
      setSmShow(true);
    } else {
      registerRequest(name, nic, posi, phone, access, ds, gs, pw, setResponse);
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
            <label>District</label>
            <select
              className="form-control"
              value={districtid}
              disabled={access == 0}
              onChange={handleDistrict}
            >
              <option value="0">Select District</option>
              {districtSet?.data.map((team) => (
                <option key={team.DistrictID} value={team.DistrictID}>
                  {team.DistrictName}
                </option>
              ))}
            </select>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>DS Division</label>
            <select
              className="form-control"
              disabled={access == 0}
              onChange={handleDs}
              value={ds}
            >
              <option value="0">Select DS Division</option>
              {dsdata?.data.map((team) => (
                <option key={team.DSID} value={team.DSID}>
                  {team.DivisionalSecretariatName}
                </option>
              ))}
            </select>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col xs={6}>
            {" "}
            <label>GS Division</label>
            <select
              className="form-control"
              disabled={access != 2}
              onChange={handleGs}
              value={gs}
            >
              <option value="0">Select GN Division</option>
              {gndata?.data.map((team) => (
                <option key={team.GNID} value={team.GNID}>
                  {team.GNDivisionName}
                </option>
              ))}
            </select>
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
              Attention
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{msg}</Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
