import * as React from "react";
import {ButtonGroup, Glyphicon, ButtonToolbar, Button} from "react-bootstrap";
import {IProjectionListItem} from "../../scripts/interfaces/IProjectionListItem";

export default class ProjectionPanel extends React.Component<IProjectionListItem, any> {

    render() {
        return (
            <tr>
                <td>{this.props.projection.name}</td>
                <td>{this.props.projection.running.toString()}</td>
                <td>{this.props.projection.size}</td>
                <td>{this.props.projection.events}</td>
                <td>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button onClick={() => this.props.stop(this.props.title)}
                                    disabled={!this.props.projection.running}>Stop</Button>
                            <Button onClick={() => this.props.restart(this.props.title)}>Restart</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </td>
                <td>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button onClick={() => this.props.saveSnapshot(this.props.title)}>Create</Button>
                            <Button onClick={() => this.props.deleteSnapshot(this.props.title)}>Delete</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
}