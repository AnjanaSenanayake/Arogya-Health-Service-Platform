import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  Input,
  Modal,
} from "react-bootstrap";
export function SureModel(props) {
  function noF(){
    if(props.no !=null) props.no();
    props.setShow(false);
  }

  function yesF(){
    props.yes();
    props.setShow(false);
  }


  return (
    <Modal
    
      size="sm"
      show={props.show}
      onHide={() => props.setShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {props?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props?.body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={noF} >Cancel</Button>
        <Button onClick={yesF}  variant="danger" >{props.okName==null? 'OK' :props.okName}</Button>
      </Modal.Footer>
    </Modal>
  );
}
