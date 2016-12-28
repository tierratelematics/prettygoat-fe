import {ObservableViewModel, ViewModel} from "ninjagoat";
import {ModelState} from "ninjagoat-projections";
import {inject} from "inversify";
import {IDialogService} from "ninjagoat-dialogs";
import {ICommandDispatcher} from "ninjagoat-commands";
import {StopProjectionCommand, PauseProjectionCommand, ResumeProjectionCommand} from "./command/ProjectionCommand";
import {Authorized} from "ninjagoat-auth";
import {SaveSnapshotCommand, DeleteSnapshotCommand} from "./command/SnapshotCommand";
import {IDiagnosticProjection} from "./projection/IDiagnosticProjection";
let autobind = require("autobind-decorator");

@ViewModel("Size")
@Authorized()
@autobind
class DiagnosticViewModel extends ObservableViewModel<ModelState<IDiagnosticProjection>> {

    model: any[] = [];

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher: ICommandDispatcher) {
        super();
    }

    protected onData(data: ModelState<any[]>): void {
        if (data.model) {
            this.model = data.model['list'];
        }
    }

    async stop(name: string) {
        try{
            await this.commandDispatcher.dispatch(new StopProjectionCommand(name));
            this.dialogService.alert("Projection now is stopped");
        }
        catch(error){
            this.dialogService.alert(error.response.error);
        }
    }

    async pause(name: string) {
        try{
            await this.commandDispatcher.dispatch(new PauseProjectionCommand(name));
            this.dialogService.alert("Projection now is paused");
        }
        catch(error){
            this.dialogService.alert(error.response.error);
        }
    }

    async resume(name: string) {
        try{
            await this.commandDispatcher.dispatch(new ResumeProjectionCommand(name));
            this.dialogService.alert("Projection now is runned");
        }
        catch(error){
            this.dialogService.alert(error.response.error);
        }
    }

    async saveSnapshot(name: string) {
        try{
            await this.commandDispatcher.dispatch(new SaveSnapshotCommand(name));
            this.dialogService.alert("Snapshot created");
        }
        catch(error){
            this.dialogService.alert(error.response.error);
        }
    }

    async deleteSnapshot(name: string) {
        try{
            await this.commandDispatcher.dispatch(new DeleteSnapshotCommand(name));
            this.dialogService.alert("Snapshot removed");
        }
        catch(error){
            this.dialogService.alert(error.response.error);
        }
    }
}

export default DiagnosticViewModel;
