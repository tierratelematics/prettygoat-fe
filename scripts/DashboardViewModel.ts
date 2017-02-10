import {ObservableViewModel, ViewModel} from "ninjagoat";
import {ModelState, ModelPhase} from "ninjagoat-projections";
import {inject} from "inversify";
import {IDialogService} from "ninjagoat-dialogs";
import {ICommandDispatcher} from "ninjagoat-commands";
import {StopProjectionCommand, RestartProjectionCommand} from "./command/ProjectionCommand";
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
        this.modelPhase = (data.phase) ? data.phase : ModelPhase.Loading;
        this.model = data.model;
    }

    async stop(name: string) {
        await this.sendCommand(new StopProjectionCommand(name), "Projection now is stopped");
    }

    async restart(name: string) {
        await this.sendCommand(new RestartProjectionCommand(name), "Projection now is restarted");
    }

    async saveSnapshot(name: string) {
        await this.sendCommand(new SaveSnapshotCommand(name), "Snapshot created");
    }

    async deleteSnapshot(name: string) {
        if (!await this.dialogService.confirm("Are you sure to delete this snapshot?"))
            await this.sendCommand(new DeleteSnapshotCommand(name), "Snapshot removed");
    }

    async sendCommand(command: Object, successMessage: string) {
        try {
            await this.commandDispatcher.dispatch(command);
            this.dialogService.alert(successMessage);
        } catch (error) {
            this.dialogService.alert(error.response.error);
        }
    }

    dependenciesOf(projection: IProjectionInfo) {
        this.dialogService.alert(_.join(projection.dependencies, ","));
    }

}

export default DashboardViewModel;
