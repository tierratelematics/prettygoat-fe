import * as React from "react";
import {Grid,Row,Col,Button,PageHeader,Alert} from "react-bootstrap";

export default class ProjectionPanel extends React.Component<any,any> {
    constructor(props,context: any) {
        super(props,context);
    }

    render() {
        return (
            <Row>
                { this.props.title }
                <Button onClick={() => this.props.stop()}>Stop</Button>
            </Row>
        );
    }
}