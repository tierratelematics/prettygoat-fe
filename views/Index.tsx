import {View} from "ninjagoat";
import IndexViewModel from "../scripts/IndexViewModel";
import * as React from "react";
import {Grid,Row,Col,Button,PageHeader,Alert} from "react-bootstrap";

export default class Index extends View<IndexViewModel> {

    render() {
        return (
            <Grid>
                <PageHeader>Command And Control GUI<small>API Projections</small></PageHeader>
                <input className="form-control" id="apiKey" value={this.viewModel.token} placeholder="Insert API Key" onChange={this.viewModel.setToken}/>
                <input className="form-control" id="endpoint" value={this.viewModel.endPoint} placeholder="Endpoint" onChange={this.viewModel.setEndPoint}/>
                <input className="form-control" id="Path" value={this.viewModel.path} placeholder="Path WebSocket" onChange={this.viewModel.setPath}/>
                <br />
                <Button onClick={this.viewModel.enterLogin} type="submit" bsStyle="primary" bsSize="large" block>Enter</Button>
            </Grid>
        );
    }
}
