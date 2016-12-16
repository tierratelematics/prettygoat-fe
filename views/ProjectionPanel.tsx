import * as React from "react";
import {ButtonGroup,Row,ButtonToolbar,Button} from "react-bootstrap";

export default class ProjectionPanel extends React.Component<any,any> {
    constructor(props,context: any) {
        super(props,context);
        this.state = {

        }
    }

    render() {
        return (
            <Row>
                { this.props.title }
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button onClick={() => this.props.stop()}>Stop</Button>
                        <Button onClick={() => this.props.pause()}>Pause</Button>
                        <Button onClick={() => this.props.resume()}>Resume</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>
        );
    }
}