import {View} from "ninjagoat";
import IndexViewModel from "../scripts/IndexViewModel";
import * as React from "react";
import {Button,Row} from "react-bootstrap";

export default class Index extends View<IndexViewModel> {

    render() {
        return (
            <div>
                <Row>
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <h1 className="text-center login-title">Command And Control GUI</h1>
                        <div className="account-wall">
                                <form className="form-signin">
                                    <input className="form-control" id="friendlyName" value={this.viewModel.friendlyName} placeholder="Insert Friendly Name" onChange={this.viewModel.setFriendlyName}/>
                                    <input className="form-control" id="apiKey" value={this.viewModel.token} placeholder="Insert API Key" onChange={this.viewModel.setToken}/>
                                    <input className="form-control" id="endpoint" value={this.viewModel.endPoint} placeholder="Endpoint" onChange={this.viewModel.setEndPoint}/>
                                    <input className="form-control" id="Path" value={this.viewModel.path} placeholder="Path WebSocket" onChange={this.viewModel.setPath}/>
                                    <br />
                                    <Button onClick={() => this.viewModel.enterLogin()} type="button" bsStyle="primary" bsSize="large" block>Enter</Button>
                                </form>
                        </div>
                    </div>
                </Row>
            </div>
        );
    }
}
