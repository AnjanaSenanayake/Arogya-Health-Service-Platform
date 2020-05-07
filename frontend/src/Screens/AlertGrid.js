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
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function Alerts(props) {
  const [refresh, dorefresh] = React.useState();
  const [dataSet, setDataSet] = React.useState();
  const [dataSetPending, setDataSetPending] = React.useState();
  const [dataSetEpidemic, setDataSetEpidemic] = React.useState();
  const [items, setItems] = React.useState();
  const [itemsPending, setItemsPending] = React.useState();

  function print() {
    console.log(props);
  }

  props.setNavTitle("Curfew Pass");

  async function handleDenie(ID, val,epidemic) {
    const UID = await localStorage.getItem('AID')
    console.log({ alertID: ID, isVerified: val,UID:UID,epidemic:epidemic })
    authRequest(
      "epidemicAlertApproveDeny",
      { alertID: ID, isVerified: val, UID:UID,epidemic:epidemic },
      dorefresh
    );
  }

  useEffect(() => {
    document.title = "Admin-" + props.navTitle;
    authRequest("getAllEpidemics", {}, setDataSetEpidemic);
    authRequest("getEpidemicAlertsApproved", {}, setDataSet);
    authRequest("getEpidemicAlertsPending", {}, setDataSetPending);
  }, [refresh]);

  var itemsObj = [];
  useEffect(() => {
    console.log("item set", dorefresh);

    console.log("Epidemics", dataSetEpidemic?.data);
    console.log("pending", dataSetPending?.data);

    let tableRows = null;
    let pendingTableRows = null;

    if (dataSet?.data) {
      tableRows = dataSet?.data?.res.map((data, index) => {
        return (
          <tr key={data.Name}>
            <th>#</th>
            <td>{data?.EpidemicAlertID}</td>
            <td>{dataSetEpidemic?.data[ data?.EpidemicID-1]?.EpidemicName}</td>
            <td>{data?.Name}</td>
            <td>{formatDate(data?.AlertDate)}</td>
            <td>
              {data?.IsVerified == 1 ? (
                <Badge variant="danger">Yes</Badge>
              ) : (
                <Badge variant="secondary">No</Badge>
              )}
            </td>
            <td>{data?.NICPP}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  handleDenie(data.EpidemicAlertID, 0,dataSetEpidemic?.data[ data?.EpidemicID-1]?.EpidemicName);
                }}
              >
                DENIE
              </Button>
            </td>
          </tr>
        );
      });
    }

    if (dataSetPending?.data) {
      pendingTableRows = dataSetPending?.data?.res.map((data, index) => {
        return (
          <tr key={data.Name}>
            <th>#</th>
            <td>{data?.EpidemicAlertID}</td>
            <td>{dataSetEpidemic?.data[data?.EpidemicID-1]?.EpidemicName}</td>
            <td>{data?.Name}</td>
            <td>{formatDate(data?.AlertDate)}</td>
            <td>
              {data?.IsVerified == 1 ? (
                <Badge variant="danger">Yes</Badge>
              ) : (
                <Badge variant="secondary">No</Badge>
              )}
            </td>
            <td>{data?.NICPP}</td>
            <td>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  handleDenie(data.EpidemicAlertID, 1,dataSetEpidemic?.data[ data?.EpidemicID-1]?.EpidemicName);
                }}
              >
                APPROVE
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  handleDenie(data.EpidemicAlertID, 0,dataSetEpidemic?.data[ data?.EpidemicID-1]?.EpidemicName);
                }}
              >
                DENIE
              </Button>
              
            </td>
          </tr>
        );
      });
    }

    // console.log(dataSet)
    setItems(tableRows);
    setItemsPending(pendingTableRows);
  }, [dataSet,dataSetPending]);

  return (
    <div>
      <br></br>
      <br></br>
      <h1 className="mt-4">Epidemic Alerts</h1>
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
              <th>EpidemicAlertID</th>
              <th>EpidemicID</th>
              <th>Name</th>
              <th>AlertDate</th>
              <th>IsVerified</th>
              <th>NICPP</th>
            </tr>
          </thead>
          {items}
          {itemsPending}
        </Table>
      )}
    </div>
  );
}
