import {ObservableViewModel, ViewModel} from "ninjagoat";
import {ModelState, ModelPhase} from "ninjagoat-projections";
import {inject} from "inversify";
import {IDialogService} from "ninjagoat-dialogs";
import {ICommandDispatcher} from "ninjagoat-commands";
import {StopProjectionCommand, RestartProjectionCommand} from "../commands/ProjectionCommand";
import {SaveSnapshotCommand, DeleteSnapshotCommand} from "../commands/SnapshotCommand";
import {map, sumBy} from "lodash";
import {IMessagesService} from "ninjagoat-messages";
import {IProjectionStats} from "../interfaces/IProjectionStats";
const humanize = require("humanize");
let autobind = require("autobind-decorator");

@ViewModel("DashboardIndex")
@autobind
class DashboardViewModel extends ObservableViewModel<ModelState<IProjectionStats[]>> {

    model: IProjectionStats[];
    modelPhase: ModelPhase;
    totalEvents: number;
    totalSize: string;
    projectionsList: string[];

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher: ICommandDispatcher,
                @inject("IMessagesService") private messagesService: IMessagesService) {
        super();
    }

    protected onData(data: ModelState<IProjectionStats[]>): void {
        this.modelPhase = (data.phase) ? data.phase : ModelPhase.Loading;
        this.model = data.model;

        this.totalEvents = sumBy(data.model, stat => stat.events);
        let bytesSize = sumBy(data.model, stat => stat.size);
        this.totalSize = humanize.filesize(bytesSize);
        this.projectionsList = map(data.model, stat => stat.name);
    }

    async stop(name: string) {
        await this.sendCommand(new StopProjectionCommand(name), "Projection now is stopped", name)
    }

    async restart(name: string) {
        if (!await this.dialogService.confirm("Are you sure to restart this projection?")) {
            await this.sendCommand(new RestartProjectionCommand(name), "Projection now is restarted", name)
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

}

export default DashboardViewModel;
