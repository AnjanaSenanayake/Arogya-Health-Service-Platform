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
  Card,
  Badge
} from "react-bootstrap";

export function Users(props) {
  const [refresh, dorefresh] = React.useState();
  const [dataSet, setDataSet] = React.useState();
  const [items, setItems] = React.useState();
  const [selectedItem, setSelectedItem] = React.useState();

  function print() {
    console.log(props);
  }
  props.setNavTitle("User");

  useEffect(() => {
    document.title = "Admin-" + props.navTitle;
    console.log(props);
    authRequest("getUsersByGNID", { GNID: 1 }, setDataSet);
    // authRequest("getUserByUID",{},setDataSet);
  }, [refresh]);

  var itemsObj = [];
  useEffect(() => {
    console.log("item set", dataSet);

    console.log(dataSet?.data);

    let tableRows = null;

    // if (dataSet?.data) {
    //   tableRows = <tr>
    //     {dataSet?.data.map((data, index) => {
    //       return (
    //         <td key={index}>
    //           {"data"}
    //         </td>
    //       );
    //     })}
    //   </tr>
    // }

    setItems(items);
  }, [dataSet]);

  return (
    <div>
      <br></br>
      <br></br> <br></br>
      <br></br>
      {/* <Container>
  <Row>
   
    <Col xs={8}>2 of 3 (wider)</Col>
    <Col>3 of 3</Col>
  </Row>
  </Container> */}
      {selectedItem == null ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>DSDivision</th>
              <th>Gender</th>
              <th>IsVerified</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* <tbody>{items}</tbody>  GNDivision: "1"
DSDivision*/}
          {dataSet?.data == null ? (
            <tr>
              <td></td>
              <td></td>
              <td></td>

              <td>Loading</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ) : (
            <tr>
              <th>#</th>
              <td>{dataSet?.data?.Name}</td>
              <td>
                {dataSet?.data?.AddressLine1 +
                  ", " +
                  dataSet?.data?.AddressLine2 +
                  ", " +
                  dataSet?.data?.AddressLine3 +
                  ", " +
                  dataSet?.data?.AddressLine4}
              </td>
              <td>{dataSet?.data?.DSDivision}</td>
              <td>{dataSet?.data?.Gender}</td>

              <td>
                {dataSet?.data?.IsVerified==0 ?<Badge variant="warning">un-verified</Badge>:<Badge variant="secondary">success</Badge>}
              
                {/* {dataSet?.data?.IsVerified} */}
                </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setSelectedItem(dataSet?.data);
                  }}
                >
                  View
                </Button>
              </td>
            </tr>
          )}
        </Table>
      ) : (
        <div>
          <Container>
            <Row>
              <Col></Col>
              <Col xs={6}>
                <Card style={{ padding: 10 }}>
                  <Card.Title>{selectedItem?.Name}</Card.Title>
                  <Card.Text>
                    NIC: {selectedItem?.NICPP}<br/>
                    DOB: {selectedItem?.DOB}<br/>
                    PrimaryContact: {selectedItem?.NICPP}<br/>
                    Address: {selectedItem?.AddressLine1+", "+selectedItem?.AddressLine2+", "+selectedItem?.AddressLine3+", "+selectedItem?.AddressLine4}<br/>
                    GNDivision: {selectedItem?.GNDivision}<br/>
                    DSDivision: {selectedItem?.NICPP}<br/>
                    Gender: {selectedItem?.DSDivision}<br/>
                    MaritalStatus: {selectedItem?.MaritalStatus}<br/>
                    IsVerified: {dataSet?.data?.IsVerified==0 ? <Button   size="sm" variant="warning">un-verified</Button>:<Button  size="sm" variant="secondary">success</Button>}
              <br/>
                    UID: {selectedItem?.UID}<br/>
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedItem(null);
                    }}
                  >
                    Close
                  </Button>
                </Card>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
