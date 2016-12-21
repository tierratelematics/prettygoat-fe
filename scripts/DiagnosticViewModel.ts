import {ObservableViewModel, ViewModel, Dictionary, Refresh} from "ninjagoat";
import {ModelState} from "ninjagoat-projections";
import {inject} from "inversify";
import {IDialogService} from "ninjagoat-dialogs";
import {ICommandDispatcher} from "ninjagoat-commands";
import {StopProjectionCommand, PauseProjectionCommand, ResumeProjectionCommand} from "./command/ProjectionCommand";
import {Authorized} from "ninjagoat-auth";
let autobind = require("autobind-decorator");

@ViewModel("Size")
@Authorized()
class DiagnosticViewModel extends ObservableViewModel<ModelState<any[]>> {

    model: any[] = [];

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher: ICommandDispatcher) {
        super();
    }

    @autobind
    stop(name: string) {
        this.commandDispatcher.dispatch(new StopProjectionCommand(name)).then(
            (value) => {
                this.dialogService.alert("Projection now is stopped");
            },
            (error) => {
                this.dialogService.alert(error.response.error);
            }
        );
    }

    @autobind
    pause(name: string) {
        this.commandDispatcher.dispatch(new PauseProjectionCommand(name)).then(
            (value) => {
                this.dialogService.alert("Projection now is paused");
            },
            (error) => {
                this.dialogService.alert(error.response.error);
            }
        );
    };

    @autobind
    resume(name: string) {
        this.commandDispatcher.dispatch(new ResumeProjectionCommand(name)).then(
            (value) => {
                this.dialogService.alert("Projection now is runned");

            },
            (error) => {
                this.dialogService.alert(error.response.error);
            }
        );
    };

    protected onData(data: ModelState<any[]>): void {
        if (data.model) {
            this.model = data.model['list'];
        }
    }
}

export default DiagnosticViewModel;
