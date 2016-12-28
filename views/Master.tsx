import {View} from "ninjagoat";
import * as React from "react";
import RootViewModel from "../scripts/RootViewModel";
import {NinjagoatDialog} from "ninjagoat-dialogs";
import {Button,Grid} from "react-bootstrap";


export default class Master extends View<RootViewModel> {

    render() {
        let buttonLogout = (this.viewModel.getToken()) ?
                <Button onClick={() => this.viewModel.logout()}>Logout</Button> : null;

        return (
            <Grid>
                <div className="pull-right marginTop10">{buttonLogout}</div>
                {this.props.children}
                <NinjagoatDialog dialogService={ this.viewModel.dialogService }/>
            </Grid>
        );
    }
}