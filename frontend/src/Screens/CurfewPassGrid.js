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
  Spinner,
  Jumbotron,
} from "react-bootstrap";
import { SureModel } from "./PopupMsg";
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}


function Poper(props) {
  const [show, setShow] = React.useState(false);
  const [popupSure, setPopupSure] = React.useState(false);
  const [popupVerify, setPopupVerify] = React.useState(false);

  const [requestResult, setRequestResult] = React.useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleVerify() {
    await authRequest("verifyUser",{uid:props.data.UID},setRequestResult)
    console.log(requestResult,'--Result')
    handleClose();
  }

  useEffect(() => {
    props.refresh(props.data);
    
  }, [requestResult]);


  async function handleDelete() {
    await authRequest("deleteUser",{uid:props.data.UID},setRequestResult)
    console.log(requestResult,'--Result')
    handleClose();
  }

  return (
    <>
      <SureModel
        yes={handleDelete}
        title={"Are You Sure?"}
        okName={"Delete"}
        body={"You are going to delete " + props.data?.Name + "'s account."}
        show={popupSure}
        setShow={setPopupSure}
      />
      <SureModel
        yes={handleVerify}
        title={"Are You Sure?"}
        okName={"Verify"}
        body={"You are going to Verify " + props.data?.Name + "'s account."}
        show={popupVerify}
        setShow={setPopupVerify}
      />

      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data?.Reason}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ padding: 10 }}>
            {/* <Card.Title>{props.data?.Name}</Card.Title> */}
            <Card.Text>
              For: {props.data?.RequestedForName +'('+ props.data?.RequestedForNICPP+')'}
              <br />
              By: {props.data?.RequestedByName +'('+ props.data?.RequestedByNICPP +')'}
              <br />
              WhereTo: {props.data?.WhereTo}
              <br />
              ValidFrom: {props.data?.ValidFrom}
              <br />
              <br />
              ValidFrom: {props.data?.ValidTo}
              <br />

             
              
              
              Status:
              {props.data?.Status == 'DENIED'? (
                <Badge size="sm" variant="danger">
                  {props.data?.Status }
                </Badge>
              ) : (
                <Badge size="sm" variant="warning">
                  {props.data?.Status }
                </Badge>
              )}
             
            </Card.Text>

            <Card.Footer>
              {props.data?.IsVerified == 0 ? (
                <Button
                  style={{ margin: 10 }}
                  variant="warning"
                  onClick={() => {
                    setPopupVerify(true);
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
                  setPopupSure(true);
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

export function Curfew(props) {
  const [refresh, dorefresh] = React.useState();
  const [dataSet, setDataSet] = React.useState();
  const [items, setItems] = React.useState();

  function print() {
    console.log(props);
  }

  props.setNavTitle("Curfew Pass");

  useEffect(() => {
    document.title = "Admin-" + props.navTitle;
    authRequest("getAllPassRequests", { GNID: 1 }, setDataSet);
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
            <td>{data?.RequestedForName}</td>
            <td>
              {data?.RequestedByName}
            </td>
            <td>{data?.Reason}</td>
            <td>{data?.WhereTo}</td>

            <td>
              {data?.Status == "DENIED" ? (
                <Badge variant="danger">Denied</Badge>
              ) : (
                <Badge variant="secondary">{data?.Status}</Badge>
              )}
            </td>
            <td>{formatDate( data?.ValidFrom)}</td>
            <td>{formatDate( data?.ValidTo)}</td>
            <td>
              <Poper data={data} refresh={dorefresh}></Poper>
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

      {dataSet?.data == null ? (
        <Container style={{ alignItems: "center" }}>
          <h1>
            <Spinner size="lg" animation="border" variant="danger" />
          </h1>
        </Container>
      ) : (
        <Table  size="sm" striped responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>For</th>
              <th>By</th>
              <th>Reason</th>
              <th>WhereTo</th>
              <th>Status</th>
              <th>Date Start</th>
              <th>Date Finish</th>
              <th>Action</th>
              
            </tr>
          </thead>
          {items}
        </Table>
      )}
    </div>
  );
}
