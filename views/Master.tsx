import {View} from "ninjagoat";
import * as React from "react";
import {Button, Grid} from "react-bootstrap";
import {NinjagoatDialog} from "ninjagoat-dialogs"
import {NinjagoatMessages} from "ninjagoat-messages"
import MasterViewModel from "../scripts/viewmodels/MasterViewModel";

export default class Master extends View<MasterViewModel> {

    render() {
        let buttonLogout = (this.viewModel.isLogged()) ?
            <Button onClick={() => this.viewModel.logout()}>Logout</Button> : null;

        return (
            <Grid>
                <div className="pull-right toolbar-button">{buttonLogout}</div>
                {this.props.children}
                <NinjagoatDialog />
                <NinjagoatMessages />
            </Grid>
        );
    }
}