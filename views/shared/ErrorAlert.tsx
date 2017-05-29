import * as React from 'react';
import {Alert} from "react-bootstrap";
import {Dictionary} from "lodash";

export default class ErrorAlert extends React.Component<Dictionary<string>,never>{
    render() {
        return (
            <Alert bsStyle="warning">
                <strong>Error!</strong> Something is gone wrong
            </Alert>
        );
    }
}