import * as React from "react";
import {ButtonGroup, Glyphicon, ButtonToolbar, Button} from "react-bootstrap";
import {IProjectionListItem} from "../../scripts/interfaces/IProjectionListItem";
import IEngineConfig from "../../scripts/interfaces/IEngineConfig";
import {lazyInject} from "ninjagoat";
import {ICommandsConfig} from "ninjagoat-commands";

export default class ProjectionPanel extends React.Component<IProjectionListItem, any> {

    @lazyInject("ICommandsConfig") private commandsConfig: ICommandsConfig;
    @lazyInject("IEngineConfig") private engineConfig: IEngineConfig;

    render() {
        let stateUrl = `${this.commandsConfig.endpoint}/api/projections/state/${this.props.stats.name}?authorization=${this.engineConfig.token}`;
        let statsUrl = `${this.commandsConfig.endpoint}/api/projections/stats/${this.props.stats.name}?authorization=${this.engineConfig.token}`;
        return (
            <tr>
                <td><a href={stateUrl} target="_blank">{this.props.stats.name}</a></td>
                <td>{this.props.stats.running.toString()}</td>
                <td>{this.props.stats.failed.toString()}</td>
                <td>{this.props.stats.realtime.toString()}</td>
                <td>{this.props.stats.humanizedSize}</td>
                <td><a href={statsUrl} target="_blank">{this.props.stats.events}</a></td>
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