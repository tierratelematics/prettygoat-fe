import {View} from "ninjagoat";
import * as React from "react";
import {Button, Row} from "react-bootstrap";
import IndexViewModel from "../scripts/viewmodels/IndexViewModel";

export default class Index extends View<IndexViewModel> {

    render() {
        return (
            <div>
                <Row>
                    <div className="col-sm-8 col-md-6 col-md-offset-3">
                        <h1 className="text-center login-title">Prettygoat's command and control</h1>
                        <div className="account-wall">
                            <form className="form-signin" onSubmit={event => {
                                event.preventDefault();
                                this.viewModel.login();
                            }}>
                                <input className="form-control" value={this.viewModel.endpoint}
                                       placeholder="Prettygoat endpoint" onChange={this.viewModel.setEndpoint}/>
                                <input className="form-control" value={this.viewModel.token}
                                       placeholder="API Key" onChange={this.viewModel.setToken}/>
                                <input className="form-control" value={this.viewModel.friendlyName}
                                       placeholder="Friendly Name" onChange={this.viewModel.setFriendlyName}/>
                                <br/>
                                <Button onClick={() => this.viewModel.login()} type="submit" bsStyle="primary"
                                        bsSize="large" block>Enter</Button>
                            </form>
                        </div>
                    </div>
                </Row>
            </div>
        );
    }
}
