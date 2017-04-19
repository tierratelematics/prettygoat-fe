import {View} from "ninjagoat";
import * as React from "react";
import RootViewModel from "../scripts/RootViewModel";
import {Button, Grid} from "react-bootstrap";
import {NinjagoatDialog} from "ninjagoat-dialogs"
import {NinjagoatMessages} from "ninjagoat-messages"

export default class Master extends View<RootViewModel> {

    render() {
        let buttonLogout = (this.viewModel.getToken()) ?
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