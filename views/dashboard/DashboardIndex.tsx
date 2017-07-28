import {lazyInject, View} from "ninjagoat";
import * as React from "react";
import {PageHeader} from "react-bootstrap";
import * as _ from "lodash";
import {ModelPhase} from "ninjagoat-projections";
import {Alert} from "react-bootstrap";
import {Dictionary} from "lodash";
import DashboardViewModel from "../../scripts/viewmodels/DashboardViewModel";
import ProjectionPanel from "./ProjectionListItem";
import {ICommandsConfig} from "ninjagoat-commands";
import IEngineConfig from "../../scripts/interfaces/IEngineConfig";

export default class DashboardIndex extends View<DashboardViewModel> {

    @lazyInject("ICommandsConfig")
    private commandsConfig: ICommandsConfig;
    @lazyInject("IEngineConfig")
    private engineConfig: IEngineConfig;

    render() {
        switch (this.viewModel.modelPhase) {
            case ModelPhase.Ready:
                return this.renderProjections();
            case ModelPhase.Loading:
                return (<div><Loader/></div>);
            case ModelPhase.Failed:
                return (<div><ErrorAlert/></div>);
            default:
                return (<div><Loader/></div>);
        }
    }

    renderProjections() {
        return (
            <div>
                <PageHeader className={_.startsWith(this.engineConfig.type, 'prod') ? 'header-prod-env' : ''}>
                    Projections - {this.engineConfig.friendlyName}<br/>
                    <small>{this.commandsConfig.endpoint}</small>
                </PageHeader>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Running</th>
                        <th>Failed</th>
                        <th>Realtime</th>
                        <th>Last event</th>
                        <th>Size</th>
                        <th>Events</th>
                        <th>Actions</th>
                        <th>Snapshot</th>
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(this.viewModel.model, stats => <ProjectionPanel
                        stats={stats} key={stats.name}
                        stop={(name: string) => this.viewModel.stop(name)}
                        restart={(name: string) => this.viewModel.restart(name)}
                        saveSnapshot={(name: string) => this.viewModel.saveSnapshot(name)}
                        deleteSnapshot={(name: string) => this.viewModel.deleteSnapshot(name)}/>)}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Total: {this.viewModel.projectionsList.length}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>{this.viewModel.totalSize}</th>
                        <th>{this.viewModel.totalEvents}</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

class ErrorAlert extends React.Component<Dictionary<string>, never> {
    render() {
        return (
            <Alert bsStyle="warning">
                <strong>Error!</strong> Something is gone wrong
            </Alert>
        );
    }
}

class Loader extends React.Component<Dictionary<string>, never> {
    render() {
        return (
            <div className="loader-container">
                <div id="loader">
                    <div id="loader_1" className="loader"></div>
                    <div id="loader_2" className="loader"></div>
                    <div id="loader_3" className="loader"></div>
                    <div id="loader_4" className="loader"></div>
                    <div id="loader_5" className="loader"></div>
                    <div id="loader_6" className="loader"></div>
                    <div id="loader_7" className="loader"></div>
                    <div id="loader_8" className="loader"></div>
                </div>
            </div>
        );
    }
}
