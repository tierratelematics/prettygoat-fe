import {ObservableViewModel, ViewModel, Refresh} from "ninjagoat";
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
import {IMessagesService} from "ninjagoat-messages";
import {Page} from "ninjagoat-analytics";
let autobind = require("autobind-decorator");

@ViewModel("DashboardIndex")
@Authorized()
@Page()
@autobind
class DashboardViewModel extends ObservableViewModel<ModelState<IDiagnosticProjection>> {

    model: IDiagnosticProjection;
    modelPhase: ModelPhase;

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher: ICommandDispatcher,
                @inject("IEngineDataRetriever") public engineDataRetriever: IEngineDataRetriever,
                @inject("ISocketConfigRetriever") public socketConfigRetriever: ISocketConfigRetriever,
                @inject("IMessagesService") private messagesService: IMessagesService) {
        super();
    }

    protected onData(data: ModelState<IDiagnosticProjection>): void {
        this.modelPhase = (data.phase) ? data.phase : ModelPhase.Loading;
        this.model = data.model;
    }

    @Refresh
    applyRefresh(){
        return true;
    }

    async stop(name: string){
        if(await this.sendCommand(new StopProjectionCommand(name), "Projection now is stopped", name))
            this.model.list[name].running = false;
        this.applyRefresh();
    }

    async restart(name: string) {
        if (!await this.dialogService.confirm("Are you sure to restart this projection?")){
            if(await this.sendCommand(new RestartProjectionCommand(name), "Projection now is restarted", name))
                this.model.list[name].running = true;
            this.applyRefresh();
        }
    }

    async saveSnapshot(name: string) {
        await this.sendCommand(new SaveSnapshotCommand(name), "Snapshot created", name);
    }

    async deleteSnapshot(name: string) {
        if (!await this.dialogService.confirm("Are you sure to delete this snapshot?"))
            await this.sendCommand(new DeleteSnapshotCommand(name), "Snapshot removed", name);
    }

    async sendCommand(command: Object, successMessage: string, nameProjection: string): Promise<boolean> {
        try {
            await this.commandDispatcher.dispatch(command);
            this.messagesService.success(successMessage, nameProjection);
        } catch (error) {
            this.messagesService.failure(error.response.error, nameProjection);
            return false;
        }

        return true;
    }

    dependenciesOf(projection: IProjectionInfo) {
        this.dialogService.alert(_.join(projection.dependencies, ","));
    }

}

export default DashboardViewModel;
