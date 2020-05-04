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

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function getCurrentDate() {
  var tempDate = new Date();
  var date =
    tempDate.getFullYear() +
    "-" +
    (tempDate.getMonth() + 1) +
    "-" +
    tempDate.getDate() +
    " " +
    tempDate.getHours() +
    ":" +
    tempDate.getMinutes() +
    ":" +
    tempDate.getSeconds();

  return date;
}

function Poper(props) {
  const [show, setShow] = React.useState(false);
  const [popupSure, setPopupSure] = React.useState(false);
  const [popupVerify, setPopupVerify] = React.useState(false);
  const [approveDeny, setApproveDeny] = React.useState();

  const handleShow = () => setShow(true);
  props.refresh(false);
  function handleClose() {
    props.refresh(true);
    setShow(false);
  }
  function handleApprove() {
    const currDate = getCurrentDate();
    authRequest(
      "requestedPassApproveDeny",
      {
        requestID: props.data?.RequestID,
        status: "APPROVED",
        AID: localStorage.getItem("AID"),
        date: currDate,
      },
      setApproveDeny
    );
    props.refresh(true);
  }

  function handleDecline() {
    const currDate = getCurrentDate();
    authRequest(
      "requestedPassApproveDeny",
      {
        requestID: props.data?.RequestID,
        status: "DENIED",
        AID: localStorage.getItem("AID"),
        date: currDate,
      },
      setApproveDeny
    );
    props.refresh(true);
  }

  return (
    <>
      <SureModel
        yes={handleDecline}
        title={"Are You Sure?"}
        okName={"Deny"}
        body={
          "You are going to Decline the curfew pass request for " +
          props.data?.Reason
        }
        show={popupSure}
        setShow={setPopupSure}
      />
      <SureModel
        yes={handleApprove}
        title={"Are You Sure?"}
        okName={"Approve"}
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
              ) : (
                <Badge variant="success">{props.data?.Status}</Badge>
              )}
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
                variant="success"
                onClick={() => {
                  setPopupVerify(true);
                }}
              >
                Approve
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  setPopupSure(true);
                }}
              >
                Deny
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
  const [districtSet, setDistrictSet] = React.useState();
  const [districtid, setDistrictId] = React.useState();
  const [dsdata, setDsData] = React.useState();
  const [gndata, setGnData] = React.useState();
  const [ds, setDs] = React.useState();
  const [gs, setGs] = React.useState();

  useEffect(() => {
    document.title = "Admin-" + props.navTitle;
    console.log(props);
    console.log("Refreshing")
    authRequest("getAllPassRequests", {}, setDataSet);
    authRequest("getAllDistricts", {}, setDistrictSet);
  }, [refresh]);

  useEffect(() => {
    console.log(districtSet?.data);
    //authRequest("getDSByDistrict", { DistrictID: 1 }, setDsData);
  }, [districtSet]);


  function handleDistrict(e) {
    setDistrictId(e.target.value);
    console.log(districtid);
    authRequest("getDSByDistrict", { DistrictID: e.target.value }, setDsData);
    console.log(dsdata);
  }

  function handleDs(e) {
    setDs(e.target.value);
    authRequest("getGNByDivision", { DSID: e.target.value }, setGnData);
    authRequest("getAllPassRequestsByDSID", {DSID: e.target.value}, setDataSet);
  }

  function handleGs(e) {
    setGs(e.target.value);
    authRequest("getAllPassRequestsByGNID", {GNID: e.target.value}, setDataSet);
  }

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
              ) : (
                <Badge variant="success">{data?.Status}</Badge>
              )}
            </td>
            <td>{formatDate(data?.ValidFrom)}</td>
            <td>{formatDate(data?.ValidTo)}</td>
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

      {/* <tbody>{items}</tbody>  GNDivision: "1"
DSDivision*/}
        <Row>
          <Col></Col>
          <Col xs={3}>
          {" "}
            <label>District</label>
            <select
              className="form-control"
              value={districtid}

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
          <Col xs={3}>
          {" "}
            <label>DS Division</label>
            <select
              className="form-control"
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
          <Col xs={3}>
          {" "}
            <label>GS Division</label>
            <select
              className="form-control"
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
        <br></br>
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
              <th>Date Start</th>
              <th>Date Finish</th>
              <th>Actions</th>
            </tr>
          </thead>
          {items}
        </Table>
      )}
    </div>
  );
}
