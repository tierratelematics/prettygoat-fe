import {View} from "ninjagoat";
import * as React from "react";
import {PageHeader} from "react-bootstrap";
import * as _ from "lodash";
import ProjectionPanel from "../ProjectionPanel";
import DashboardViewModel from "../../scripts/DashboardViewModel";
import {ISocketConfig} from "ninjagoat-projections";
import IEngineData from "../../scripts/configs/IEngineData";
import {IProjectionInfo} from "../../scripts/projection/IProjectionInfo";

export default class DashboardIndex extends View<DashboardViewModel> {

    render() {
        let engineData:IEngineData = this.viewModel.engineDataRetriever.engineData();
        let socketConfig:ISocketConfig = this.viewModel.socketConfigRetriever.socketConfig();

        let projections = [];
        if (this.viewModel.model)
            projections = _.map(this.viewModel.model.list, (value: any, key: string) => {
                return <ProjectionPanel title={key} projection={value}
                                        stop={(name:string) => this.viewModel.stop(name)}
                                        pause={(name:string) => this.viewModel.pause(name)}
                                        resume={(name:string) => this.viewModel.resume(name)}
                                        saveSnapshot={(name:string) => this.viewModel.saveSnapshot(name)}
                                        deleteSnapshot={(name:string) => this.viewModel.deleteSnapshot(name)}
                                        dependencies={(projection:IProjectionInfo) => this.viewModel.dependenciesOf(projection)}/>
            });

        return (
            <div>
                <PageHeader className={ _.startsWith(engineData.type,'prod') ? 'header-prod-env' : '' }>
                    Projections - {engineData.name} <small>{socketConfig.endpoint+socketConfig.path}</small>
                </PageHeader>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Projection Name</th>
                        <th>Status</th>
                        <th>Size</th>
                        <th>Events</th>
                        <th>ReadModels</th>
                        <th>Actions</th>
                        <th>Snapshot</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projections}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Total Number: {(this.viewModel.model) ? _.keys(this.viewModel.model.list).length : 0}</th>
                        <th>&nbsp;</th>
                        <th>{(this.viewModel.model) ? this.viewModel.model.totalSize : ""}</th>
                        <th>{(this.viewModel.model) ? this.viewModel.model.processedEvents : ""}</th>
                        <th>{(this.viewModel.model) ? this.viewModel.model.processedReadModels : ""}</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}