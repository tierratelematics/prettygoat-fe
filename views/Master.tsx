import {View} from "ninjagoat";
import * as React from "react";
import RootViewModel from "../scripts/RootViewModel";
import IndexDialog from "./IndexDialog";
import {NinjagoatDialog} from "ninjagoat-dialogs";

export default class Master extends View<RootViewModel> {

    render() {
        return (
            <div>
                {this.props.children}
                <NinjagoatDialog dialogService={ this.viewModel.dialogService } templates={{ testDialog:IndexDialog }}/>
            </div>
        );
    }
}