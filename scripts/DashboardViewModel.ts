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
    modelReady : boolean = false;

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher: ICommandDispatcher,
                @inject("IEngineDataRetriever") public engineDataRetriever: IEngineDataRetriever,
                @inject("ISocketConfigRetriever") public socketConfigRetriever: ISocketConfigRetriever) {
        super();
    }

    protected onData(data: ModelState<IDiagnosticProjection>): void {
        this.modelReady = data.phase === ModelPhase.Ready;
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

    async deleteSnapshot(name: string) {
        try{
            if(!await this.dialogService.confirm("Are you sure to delete this snapshot?"))
                this.applyDeleteSnaphost(name)
        }
        catch (error){

        }
    }

    async applyDeleteSnaphost(name: string) {
        try {
            await this.commandDispatcher.dispatch(new DeleteSnapshotCommand(name));
            this.dialogService.alert("Snapshot removed");
        }
        catch (error) {
            this.dialogService.alert(error.response.error);
        }
    }

    dependenciesOf(projection:IProjectionInfo){
        this.dialogService.alert(_.join(projection.dependencies,","));
    }

}

export default DashboardViewModel;
