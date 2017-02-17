import {ObservableViewModel, ViewModel, ISettingsManager} from "ninjagoat";
import {ModelState} from "ninjagoat-projections";
import {autobind} from "core-decorators";
import {IDialogService} from "ninjagoat-dialogs";
import {inject} from "inversify";
import {ICommandDispatcher, CommandResponse} from "ninjagoat-commands";
import {INavigationManager} from "ninjagoat";
import AuthorizationCommand from "./command/AuthorizationCommand";
import {Validate, validate, isValid} from "class-validator";
import {Page} from "ninjagoat-analytics";
import {NotBlank} from "./shared/Validators";
import IEngineData from "./configs/IEngineData";
import {IMessagesService} from "ninjagoat-messages";

@autobind
@ViewModel("Index")
@Page()
class IndexViewModel extends ObservableViewModel<ModelState<any[]>> {

    @Validate(NotBlank, {message: "The Friendly Name is required"})
    friendlyName: string;
    @Validate(NotBlank, {message: "The Token is required"})
    token: string;
    @Validate(NotBlank, {message: "The Endpoint is required"})
    endPoint: string;
    @Validate(NotBlank, {message: "The Path is required"})
    path: string;

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher: ICommandDispatcher,
                @inject("INavigationManager") private navigationManager: INavigationManager,
                @inject("ISettingsManager") private settingsManager: ISettingsManager,
                @inject("IMessagesService") private messagesService: IMessagesService) {
        super();
    }

    setToken(event) {
        this.token = event.target.value;
    }

    setEndPoint(event) {
        this.endPoint = event.target.value;
    }

    setPath(event) {
        this.path = event.target.value;
    }

    setFriendlyName(event) {
        this.friendlyName = event.target.value;
    }

    async doLogin() {
        if (!isValid(this)) {
            this.dialogService.alert(validate(this)[0].errorMessage);
            return;
        }

        this.settingsManager.setValue<string>("endpoint", this.endPoint);
        this.settingsManager.setValue<string>("path", this.path);
        this.settingsManager.setValue<string>("tokenAPI", this.token);

        try {
            let commandResponse: CommandResponse = await this.commandDispatcher.dispatch(new AuthorizationCommand(this.token));
            let engineData: IEngineData = {"name": this.friendlyName, "type": commandResponse.response.environment};
            this.settingsManager.setValue<IEngineData>("engineData", engineData);
            this.navigationManager.navigate("dashboard");
        }
        catch (error) {
            let messageError:string = (error) ? "Endpoint not valid" : error.response.error;
            this.dialogService.alert(messageError);
            this.settingsManager.setValue<string>("tokenAPI", "");
        }
    }

    protected onData(item: ModelState<any[]>): void {

    }
}

export default IndexViewModel;