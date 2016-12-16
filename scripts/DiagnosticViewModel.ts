import {ObservableViewModel, ViewModel, Dictionary} from "ninjagoat";
import {ModelState} from "ninjagoat-projections";
import {inject} from "inversify";
import {IDialogService} from "ninjagoat-dialogs";
import StopProjectionCommand from "./command/StopProjectionCommand";
import {ICommandDispatcher} from "ninjagoat-commands";
import PauseProjectionCommand from "./command/PauseProjectionCommand";

@ViewModel("Size")
class DiagnosticViewModel extends ObservableViewModel<ModelState<any[]>> {

    model: any[] = [];

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher: ICommandDispatcher) {
        super();
    }

    stop(name: string) {
        console.log("ARRIVED NAME", name,this);

        this.commandDispatcher.dispatch(new StopProjectionCommand(name)).then(
            (value) => {
            },
            (error) => {
                this.dialogService.alert(error.response.error);
            }
        );
    }

    pause(name: string) {
        this.commandDispatcher.dispatch(new PauseProjectionCommand(name)).then(
            (value) => {

            },
            (error) => {
                this.dialogService.alert(error.response.error);
            }
        );
    };

    resume(name: string) {
        this.commandDispatcher.dispatch(new PauseProjectionCommand(name)).then(
            (value) => {

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
