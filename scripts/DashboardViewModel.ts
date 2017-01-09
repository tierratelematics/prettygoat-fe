import {ObservableViewModel, ViewModel} from "ninjagoat";
import {ModelState} from "ninjagoat-projections";
import {inject} from "inversify";
import {IDialogService} from "ninjagoat-dialogs";
import {ICommandDispatcher} from "ninjagoat-commands";
import {StopProjectionCommand, PauseProjectionCommand, ResumeProjectionCommand} from "./command/ProjectionCommand";
import {Authorized} from "ninjagoat-auth";
import {SaveSnapshotCommand, DeleteSnapshotCommand} from "./command/SnapshotCommand";
import {IDiagnosticProjection} from "./projection/IDiagnosticProjection";
import {IEngineDataRetriever} from "./configs/IEngineDataRetriever";
import {ISocketConfigRetriever} from "./configs/ISocketConfigRetriever";
let autobind = require("autobind-decorator");

@ViewModel("DashboardIndex")
@Authorized()
@autobind
class DashboardViewModel extends ObservableViewModel<ModelState<IDiagnosticProjection>> {

    model: IDiagnosticProjection;

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher: ICommandDispatcher,
                @inject("IEngineDataRetriever") public engineDataRetriever: IEngineDataRetriever,
                @inject("ISocketConfigRetriever") public socketConfigRetriever: ISocketConfigRetriever) {
        super();
    }

    protected onData(data: ModelState<IDiagnosticProjection>): void {
        this.model = data.model;
    }

    async stop(name: string) {
        try {
            await this.commandDispatcher.dispatch(new StopProjectionCommand(name));
            this.dialogService.alert("Projection now is stopped");
        }
        catch (error) {
            this.dialogService.alert(error.response.error);
        }
    }

    async pause(name: string) {
        try {
            await this.commandDispatcher.dispatch(new PauseProjectionCommand(name));
            this.dialogService.alert("Projection now is paused");
        }
        catch (error) {
            this.dialogService.alert(error.response.error);
        }
    }

    async resume(name: string) {
        try {
            await this.commandDispatcher.dispatch(new ResumeProjectionCommand(name));
            this.dialogService.alert("Projection now is runned");
        }
        catch (error) {
            this.dialogService.alert(error.response.error);
        }
    }

    async saveSnapshot(name: string) {
        try {
            await this.commandDispatcher.dispatch(new SaveSnapshotCommand(name));
            this.dialogService.alert("Snapshot created");
        }
        catch (error) {
            this.dialogService.alert(error.response.error);
        }
    }

    deleteSnapshot(name: string) {
        this.dialogService.confirm("Are you sure to delete this snapshot?")
            .then(status => {
                if (!status) this.sendCommandDeleteSnapshot(name)
            });
    }

    async sendCommandDeleteSnapshot(name: string) {
        try {
            await this.commandDispatcher.dispatch(new DeleteSnapshotCommand(name));
            this.dialogService.alert("Snapshot removed");
        }
        catch (error) {
            this.dialogService.alert(error.response.error);
        }
    }
}

export default DashboardViewModel;
