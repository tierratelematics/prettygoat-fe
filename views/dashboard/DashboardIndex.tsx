import {View} from "ninjagoat";
import * as React from "react";
import {PageHeader} from "react-bootstrap";
import * as _ from "lodash";
import ProjectionPanel from "../ProjectionPanel";
import DashboardViewModel from "../../scripts/DashboardViewModel";

export default class DashboardIndex extends View<DashboardViewModel> {

    render() {
        let projections = [];
        if(this.viewModel.model) ///model is ReadyState
            projections = _.map(this.viewModel.model.list, (value: any, key: string) => {
                return <ProjectionPanel title={key} projection={value}
                                        stop={() => this.viewModel.stop(key)}
                                        pause={() => this.viewModel.pause(key)}
                                        resume={() => this.viewModel.resume(key)}
                                        saveSnapshot={() => this.viewModel.saveSnapshot(key)}
                                        deleteSnapshot={() => this.viewModel.deleteSnapshot(key)}/>
            });

        return (
            <div>
                <PageHeader>Projections
                    <small>Overview</small>
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
                </table>
            </div>
        );
    }
}