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
  Badge,
} from "react-bootstrap";

function Poper(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleVerify(user) {}

  function handleDelete(user) {}
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data?.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ padding: 10 }}>
            {/* <Card.Title>{props.data?.Name}</Card.Title> */}
            <Card.Text>
              NIC: {props.data?.NICPP}
              <br />
              DOB: {props.data?.DOB}
              <br />
              PrimaryContact: {props.data?.PrimaryContact}
              <br />
              Address:{" "}
              {props.data?.AddressLine1 +
                ", " +
                props.data?.AddressLine2 +
                ", " +
                props.data?.AddressLine3 +
                ", " +
                props.data?.AddressLine4}
              <br />
              GNDivision: {props.data?.GNDivision}
              <br />
              DSDivision: {props.data?.DSDivision}
              <br />
              Gender: {props.data?.Gender}
              <br />
              MaritalStatus: {props.data?.MaritalStatus}
              <br />
              IsVerified:{" "}
              {props.data?.IsVerified == 0 ? (
                <Badge size="sm" variant="warning">
                  No
                </Badge>
              ) : (
                <Badge size="sm" variant="danger">
                  Yes
                </Badge>
              )}
              <br />
              UID: {props.data?.UID}
              <br />
            </Card.Text>

            <Card.Footer>
              {props.data?.IsVerified == 0 ? (
                <Button
                  variant="warning"
                  onClick={() => {
                    handleVerify(props.data);
                  }}
                >
                  Verify
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={() => {
                    handleVerify(props.data);
                  }}
                >
                  Un Verify
                </Button>
              )}

              <Button
                variant="danger"
                onClick={() => {
                  handleDelete(props.data);
                }}
              >
                Delete
              </Button>
            </Card.Footer>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

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
    authRequest("getUsersByGNID", { GNID: 1 }, setDataSet);
    // authRequest("getUserByUID",{},setDataSet);
  }, [refresh]);

  var itemsObj = [];
  useEffect(() => {
    console.log("item set", dataSet);

    console.log(dataSet?.data);

    let tableRows = null;

    if (dataSet?.data) {
      tableRows = dataSet?.data.map((data, index) => {
        return (
          <tr key={data.Name}>
            <th>#</th>
            <td>{data?.Name}</td>
            <td>
              {data?.AddressLine1 +
                ", " +
                data?.AddressLine2 +
                ", " +
                data?.AddressLine3 +
                ", " +
                data?.AddressLine4}
            </td>
            <td>{data?.DSDivision}</td>
            <td>{data?.Gender}</td>

            <td>
              {data?.IsVerified == 0 ? (
                <Badge variant="warning">No</Badge>
              ) : (
                <Badge variant="secondary">Yes</Badge>
              )}

              {/* {dataSet?.data?.IsVerified} */}
            </td>
            <td>
              <Poper data={data}></Poper>
            </td>
          </tr>
        );
      });
    }

    setItems(tableRows);
  }, [dataSet]);

  return (
    <div>
      <br></br>
      <br></br>

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
          items
        )}
      </Table>
    </div>
  );
}
