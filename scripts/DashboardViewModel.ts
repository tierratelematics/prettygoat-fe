import {ObservableViewModel, ViewModel} from "ninjagoat";
import {ModelState, ModelPhase} from "ninjagoat-projections";
import {inject} from "inversify";
import {IDialogService} from "ninjagoat-dialogs";
import {ICommandDispatcher} from "ninjagoat-commands";
import {StopProjectionCommand, PauseProjectionCommand, ResumeProjectionCommand} from "./command/ProjectionCommand";
import {Authorized} from "ninjagoat-auth";
import {SaveSnapshotCommand, DeleteSnapshotCommand} from "./command/SnapshotCommand";
import {IDiagnosticProjection} from "./projection/IDiagnosticProjection";
import {IEngineDataRetriever} from "./configs/IEngineDataRetriever";
import {ISocketConfigRetriever} from "./configs/ISocketConfigRetriever";
import {IProjectionInfo} from "./projection/IProjectionInfo";
import * as _ from "lodash";
let autobind = require("autobind-decorator");

@ViewModel("DashboardIndex")
@Authorized()
@autobind
class DashboardViewModel extends ObservableViewModel<ModelState<IDiagnosticProjection>> {

    model: IDiagnosticProjection;
    modelPhase: ModelPhase;

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher: ICommandDispatcher,
                @inject("IEngineDataRetriever") public engineDataRetriever: IEngineDataRetriever,
                @inject("ISocketConfigRetriever") public socketConfigRetriever: ISocketConfigRetriever) {
        super();
    }

    protected onData(data: ModelState<IDiagnosticProjection>): void {
        this.modelPhase = data.phase;
        this.model = data.model;
    }

    async pause(name: string) {
        await this.sendCommand(new PauseProjectionCommand(name));
        this.dialogService.alert("Projection now is paused");
    }

    async resume(name: string) {
        await this.sendCommand(new ResumeProjectionCommand(name));
        this.dialogService.alert("Projection now is runned");
    }

    async saveSnapshot(name: string) {
        await this.sendCommand(new SaveSnapshotCommand(name));
        this.dialogService.alert("Snapshot created");
    }

    async deleteSnapshot(name: string) {
        try {
            if (!await this.dialogService.confirm("Are you sure to delete this snapshot?"))
                this.applyDeleteSnaphost(name)
        } catch (error) {

        }
    }

    async applyDeleteSnaphost(name: string) {
        await this.sendCommand(new DeleteSnapshotCommand(name));
        this.dialogService.alert("Snapshot removed");
    }

    async sendCommand(command: Object) {
        try {
            await this.commandDispatcher.dispatch(command);
        } catch (error) {
            this.dialogService.alert(error.response.error);
        }
    }

    dependenciesOf(projection: IProjectionInfo) {
        this.dialogService.alert(_.join(projection.dependencies, ","));
    }

}

export default DashboardViewModel;
