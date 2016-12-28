import * as React from "react";
import {ButtonGroup, Row, ButtonToolbar, Button} from "react-bootstrap";
import {IProjectionPanel} from "../scripts/projection/IProjectionPanel";

export default class ProjectionPanel extends React.Component<IProjectionPanel,any> {

    constructor(props: IProjectionPanel, context: any) {
        super(props, context);
    }

    render() {
        return (
            <tr>
                <td>{ this.props.title }</td>
                <td>{ this.props.projection.status }</td>
                <td>{ this.props.projection.size }</td>
                <td>{ this.props.projection.events }</td>
                <td>{ this.props.projection.readModels }</td>
                <td>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button onClick={() => this.props.pause()}
                                    disabled={this.props.projection.status!='run'}>Pause</Button>
                            <Button onClick={() => this.props.resume()}
                                    disabled={this.props.projection.status!='pause'}>Resume</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </td>
                <td>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button onClick={() => this.props.saveSnapshot()}>Create</Button>
                            <Button onClick={() => this.props.deleteSnapshot()}>Delete</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
}