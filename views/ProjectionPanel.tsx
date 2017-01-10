import * as _ from "lodash";
import * as React from "react";
import {ButtonGroup, Glyphicon, ButtonToolbar, Button} from "react-bootstrap";
import {IProjectionPanel} from "../scripts/projection/IProjectionPanel";

export default class ProjectionPanel extends React.Component<IProjectionPanel,any> {

    render() {
        let splitProjectionLabel = !_.isUndefined(this.props.projection.splits) ? this.props.projection.splits : "Na";
        let dependenciesList = !_.isEmpty(this.props.projection.dependencies) ?
            <Glyphicon glyph="th-list" onClick={() => this.props.dependencies()}/> : "";

        return (
            <tr>
                <td>{dependenciesList} { this.props.title } ({splitProjectionLabel})</td>
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