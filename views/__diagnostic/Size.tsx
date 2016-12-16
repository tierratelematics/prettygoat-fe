import {View} from "ninjagoat";
import * as React from "react";
import DiagnosticViewModel from "../../scripts/DiagnosticViewModel";
import {Grid,Row,Col,Button,PageHeader,Alert} from "react-bootstrap";
import * as _ from "lodash";

export default class Size extends View<DiagnosticViewModel> {

    render() {
        let rows = _.map(this.viewModel.model, function(value, key) {
            return <li><b>{key}</b></li>;
        });

        return (
            <div>
                <Grid>
                    <PageHeader>Projections<small>Overview</small></PageHeader>
                    <Row>
                        <ul>
                            {rows}
                        </ul>
                    </Row>
                </Grid>
                {this.props.children}
            </div>
        );
    }
}