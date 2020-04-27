import React, { useEffect } from "react";
import logo from "../img/sl.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { registerRequest } from "../Methods/authMethod";
import { logout, authRequest } from "../Methods/authMethod";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  Input,
  Modal,
  Table,
  th,
  tr,
  thead,
} from "react-bootstrap";

export function Users(props) {
  const [refresh, dorefresh] = React.useState();
  const [dataSet, setDataSet] = React.useState();
  const [items, setItems] = React.useState();
  function print() {
    console.log(props);
  }
  props.setNavTitle("User");

  useEffect(() => {
    document.title = "Admin-" + props.navTitle;
    console.log(props);
    authRequest("getGNByDivision", {}, setDataSet);

    // setloginStates(token !== "null");
  }, [refresh]);


  var itemsObj;
  useEffect(() => {
    console.log("item set", dataSet);

   
    setItems(itemsObj);
  }, [dataSet]);


  return (
    <div>
      <br></br>
      <br></br> <br></br>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Pandemic Name</th>
          </tr>
        </thead>
        <tbody>
          {/* {items} */}
        </tbody>
      </Table>
    </div>
  );
}
