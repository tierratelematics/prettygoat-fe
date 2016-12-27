import {View} from "ninjagoat";
import * as React from "react";
import DiagnosticViewModel from "../scripts/DiagnosticViewModel";
import {PageHeader} from "react-bootstrap";
import * as _ from "lodash";
import ProjectionPanel from "./ProjectionPanel";

export default class Size extends View<DiagnosticViewModel> {

    render() {
        let projections = _.map(this.viewModel.model, (value: any, key: string) => {
            return <ProjectionPanel title={key} projection={value}
                                    stop={() => this.viewModel.stop(key)}
                                    pause={() => this.viewModel.pause(key)}
                                    resume={() => this.viewModel.resume(key)}
                                    saveSnapshot={() => this.viewModel.saveSnapshot(key)}
                                    deleteSnapshot={() => this.viewModel.deleteSnapshot(key)}/>
        });

        return (
            <div>
                <PageHeader>Projections <small>Overview</small></PageHeader>
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