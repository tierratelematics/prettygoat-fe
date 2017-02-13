import {isUndefined, isEmpty} from "lodash";
import * as React from "react";
import {ButtonGroup, Glyphicon, ButtonToolbar, Button} from "react-bootstrap";
import {IProjectionPanel} from "../scripts/projection/IProjectionPanel";

export default class ProjectionPanel extends React.Component<IProjectionPanel,any> {

    render() {
        let splitProjectionLabel = isUndefined(this.props.projection.splits) ? "Na" : this.props.projection.splits;
        let dependenciesList = isEmpty(this.props.projection.dependencies) ? "" :
            <Glyphicon glyph="th-list" onClick={() => this.props.dependencies(this.props.projection)}/>;

        return (
            <tr>
                <td>{dependenciesList} { this.props.title } ({splitProjectionLabel})</td>
                <td>{ this.props.projection.running.toString() }</td>
                <td>{ this.props.projection.size }</td>
                <td>{ this.props.projection.events }</td>
                <td>{ this.props.projection.readModels }</td>
                <td>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button onClick={() => this.props.stop(this.props.title)}
                                    disabled={!this.props.projection.running}>Stop</Button>
                            <Button onClick={() => this.props.restart(this.props.title)}
                                    disabled={!this.props.projection.running}>Restart</Button>
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