

import { Button, Row, Col, Container, Form, Input,Modal } from "react-bootstrap";
export function CustomModel(props){

    return (
        <Modal
            size="sm"
            show={props.smShow}
            onHide={() => props.setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {props.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
          </Modal>
    )
}