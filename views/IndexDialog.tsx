import {CustomDialog} from "ninjagoat-dialogs";
import StaticModel from "../scripts/StaticModel";
import {Modal} from "react-bootstrap";
import * as React from "react";
import {Button} from "react-bootstrap";

class IndexDialog extends CustomDialog<StaticModel> {

    render() {
        let status = this.props.status;
        let dialog = this.props.dialog;
        return (
            <Modal show={dialog.open} onHide={status.cancel.bind(this.props.status)}>
                <Modal.Header closeButton>
                    <Modal.Title>{dialog.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dialog.data.title}
                    <p>{dialog.data.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={status.reject.bind(status)}>No</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default IndexDialog