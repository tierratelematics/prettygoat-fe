import * as React from "react";
import {ButtonGroup, Glyphicon, ButtonToolbar, Button} from "react-bootstrap";
import {IProjectionListItem} from "../../scripts/interfaces/IProjectionListItem";

export default class ProjectionPanel extends React.Component<IProjectionListItem, any> {

    render() {
        return (
            <tr>
                <td>{this.props.stats.name}</td>
                <td>{this.props.stats.running.toString()}</td>
                <td>{this.props.stats.failed.toString()}</td>
                <td>{this.props.stats.realtime.toString()}</td>
                <td>{this.props.stats.lastEvent}</td>
                <td>{this.props.stats.humanizedSize}</td>
                <td>{this.props.stats.events}</td>
                <td>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button onClick={() => this.props.stop(this.props.stats.name)}
                                    disabled={!this.props.stats.running}>Stop</Button>
                            <Button onClick={() => this.props.restart(this.props.stats.name)}>Restart</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </td>
                <td>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button onClick={() => this.props.saveSnapshot(this.props.stats.name)}>Create</Button>
                            <Button onClick={() => this.props.deleteSnapshot(this.props.stats.name)}>Delete</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
}