import {View} from "ninjagoat";
import IndexViewModel from "../scripts/IndexViewModel";
import * as React from "react";
import {Button, Row} from "react-bootstrap";

export default class Index extends View<IndexViewModel> {

    render() {
        return (
            <div>
                <Row>
                    <div className="col-sm-8 col-md-6 col-md-offset-3">
                        <h1 className="text-center login-title">Prettygoat's command and control</h1>
                        <div className="account-wall">
                            <form className="form-signin">
                                <input className="form-control" id="endpoint" value={this.viewModel.endPoint}
                                       placeholder="Prettygoat endpoint" onChange={this.viewModel.setEndPoint}/>
                                <input className="form-control" id="apiKey" value={this.viewModel.token}
                                       placeholder="API Key" onChange={this.viewModel.setToken}/>
                                <input className="form-control" id="friendlyName" value={this.viewModel.friendlyName}
                                       placeholder="Friendly Name" onChange={this.viewModel.setFriendlyName}/>
                                <br/>
                                <Button onClick={() => this.viewModel.doLogin()} type="button" bsStyle="primary"
                                        bsSize="large" block>Enter</Button>
                            </form>
                        </div>
                    </div>
                </Row>
            </div>
        );
    }
}
