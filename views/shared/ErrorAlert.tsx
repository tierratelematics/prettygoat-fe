import * as React from 'react';
import {Alert} from "react-bootstrap";

export default class ErrorAlert extends React.Component<void,never>{
    render() {
        return (
            <Alert bsStyle="warning">
                <strong>Error!</strong> Something is gone wrong
            </Alert>
        );
    }
}