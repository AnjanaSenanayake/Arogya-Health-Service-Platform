import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { logout, authRequest } from "../Methods/authMethod";

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

function Poper(props) {
  const [show, setShow] = React.useState(false);
  const [popupSure, setPopupSure] = React.useState(false);
  const [popupVerify, setPopupVerify] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleVerify() {}

  function handleDelete() {}

  return (
    <>
      <SureModel
        yes={handleDelete}
        title={"Are You Sure?"}
        okName={"Decline"}
        body={
          "You are going to Decline the curfew pass request for " +
          props.data?.Reason
        }
        show={popupSure}
        setShow={setPopupSure}
      />
      <SureModel
        yes={handleVerify}
        title={"Are You Sure?"}
        okName={"Verify"}
        body={
          "You are going to accept the curfew pass request for " +
          props.data?.Reason
        }
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
              Reason: {props.data?.Reason}
              <br />
              To Where: {props.data?.WhereTo}
              <br />
              Valid From: {props.data?.ValidFrom}
              <br />
              Valid To: {props.data?.ValidTo}
              <br />
              Status:
              {props.data?.Status === "PENDING" ? (
                <Badge variant="warning">{props.data?.Status}</Badge>
              ) : props.data?.Status === "DENIED" ? (
                <Badge variant="danger">{props.data?.Status}</Badge>
              ) : (<Badge variant="success">{props.data?.Status}</Badge>)}
              <br />
              Requested for (Name): {props.data?.RequestedForName}
              <br />
              Requested for (NIC): {props.data?.RequestedForNICPP}
              <br />
              Requested By: {props.data?.RequestedByName}
              <br />
              Inspected By: {props.data?.InspectedBy}
              <br />
              Inspected On: {props.data?.InspectedOn}
              <br />
              Request ID: {props.data?.RequestID}
              <br />
            </Card.Text>

            <Card.Footer>
              <Button
                style={{ margin: 10 }}
                variant="warning"
                onClick={() => {
                  setPopupVerify(true);
                }}
              >
                Accept
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  setPopupSure(true);
                }}
              >
                Decline
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

export function CurfewPasses(props) {
  props.setNavTitle("CurfewPasses");
  const [refresh, dorefresh] = React.useState();
  const [dataSet, setDataSet] = React.useState();
  const [items, setItems] = React.useState();

  useEffect(() => {
    document.title = "Admin-" + props.navTitle;
    console.log(props);
    authRequest("getAllPassRequests", {}, setDataSet);
  }, [refresh]);

  useEffect(() => {
    console.log(dataSet?.data);

    let tableRows = null;

    if (dataSet?.data) {
      tableRows = dataSet?.data.map((data, index) => {
        return (
          <tr key={data.RequestID}>
            <th>#</th>
            <td>{data?.RequestedByName}</td>
            <td>{data?.RequestedForName}</td>
            <td>{data?.WhereTo}</td>
            <td>{data?.Reason}</td>

            <td>
              {data?.Status === "PENDING" ? (
                <Badge variant="warning">{data?.Status}</Badge>
              ) : data?.Status === "DENIED" ? (
                <Badge variant="danger">{data?.Status}</Badge>
              ) : (<Badge variant="success">{data?.Status}</Badge>)}
              
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

      {/* <tbody>{items}</tbody>  GNDivision: "1"
DSDivision*/}
      {dataSet?.data == null ? (
        <Container style={{ alignItems: "center" }}>
          <h1>
            <Spinner size="lg" animation="border" variant="danger" />
          </h1>
        </Container>
      ) : (
        <Table size="sm" striped responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Requested By</th>
              <th>Requested for</th>
              <th>To Where</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {items}
        </Table>
      )}
    </div>
  );
}
