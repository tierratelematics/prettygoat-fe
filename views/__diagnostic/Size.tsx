import {View} from "ninjagoat";
import * as React from "react";
import DiagnosticViewModel from "../../scripts/DiagnosticViewModel";
import {Grid, Row, Col, Button, PageHeader, Alert} from "react-bootstrap";
import * as _ from "lodash";
import ProjectionPanel from "../ProjectionPanel";

export default class Size extends View<DiagnosticViewModel> {

    render() {
        let projections = _.map(this.viewModel.model, (value: any, key: string) => {
            return <ProjectionPanel title={key} projection={value}
                                    stop={() => this.viewModel.stop(key)}
                                    pause={() => this.viewModel.pause(key)}
                                    resume={() => this.viewModel.resume(key)}/>
        });

        return (
            <div>
                <Grid>
                    <PageHeader>Projections
                        <small>Overview</small>
                    </PageHeader>
                    <Row>
                        {projections}
                    </Row>
                </Grid>
            </div>
        );
    }
}