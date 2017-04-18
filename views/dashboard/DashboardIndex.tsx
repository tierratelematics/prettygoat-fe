import {View} from "ninjagoat";
import * as React from "react";
import {PageHeader} from "react-bootstrap";
import * as _ from "lodash";
import ProjectionPanel from "../ProjectionPanel";
import Loader from "../shared/Loader";
import DashboardViewModel from "../../scripts/DashboardViewModel";
import {ISocketConfig, ModelPhase} from "ninjagoat-projections";
import IEngineData from "../../scripts/configs/IEngineData";
import {IProjectionInfo} from "../../scripts/projection/IProjectionInfo";
import ErrorAlert from "../shared/ErrorAlert";

export default class DashboardIndex extends View<DashboardViewModel> {

    render() {
        switch (this.viewModel.modelPhase) {
            case ModelPhase.Ready:
                return this.renderReadyPhase();
            case ModelPhase.Loading:
                return (<div><Loader /></div>);
            case ModelPhase.Failed:
                return (<div><ErrorAlert /></div>);
            default:
                return (<div><Loader /></div>);
        }
    }

    renderReadyPhase() {
        let engineData: IEngineData = this.viewModel.engineDataRetriever.engineData();
        let socketConfig: ISocketConfig = this.viewModel.socketConfigRetriever.socketConfig();
        let projections = _.map(this.viewModel.model.list, (value: IProjectionInfo) => {
            return <ProjectionPanel title={value.name} projection={value} key={value.name}
                                    stop={(name:string) => this.viewModel.stop(name)}
                                    restart={(name:string) => this.viewModel.restart(name)}
                                    saveSnapshot={(name:string) => this.viewModel.saveSnapshot(name)}
                                    deleteSnapshot={(name:string) => this.viewModel.deleteSnapshot(name)}
                                    dependencies={(projection:IProjectionInfo) => this.viewModel.dependenciesOf(projection)}/>
        });


        return (
            <div>
                <PageHeader className={ _.startsWith(engineData.type,'prod') ? 'header-prod-env' : '' }>
                    Projections - {engineData.name} <small>{socketConfig.endpoint + socketConfig.path}</small>
                </PageHeader>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Projection Name</th>
                        <th>Running</th>
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
                        <th>Total Number: {_.keys(this.viewModel.model.list).length}</th>
                        <th></th>
                        <th>{this.viewModel.model.totalSize}</th>
                        <th>{this.viewModel.model.processedEvents}</th>
                        <th>{this.viewModel.model.processedReadModels}</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}