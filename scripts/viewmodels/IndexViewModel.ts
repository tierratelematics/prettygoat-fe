import {ObservableViewModel, ViewModel, ISettingsManager, Refresh} from "ninjagoat";
import {autobind} from "core-decorators";
import {IDialogService} from "ninjagoat-dialogs";
import {inject} from "inversify";
import {ICommandDispatcher, CommandResponse, ICommandsConfig} from "ninjagoat-commands";
import {INavigationManager} from "ninjagoat";
import AuthorizationCommand from "../commands/AuthorizationCommand";
import {Validate, validate, isValid} from "class-validator";
import {NotBlank} from "../Validators";
import IEngineConfig from "../interfaces/IEngineConfig";

@autobind
@ViewModel("Index")
class IndexViewModel extends ObservableViewModel<void> {

    @Validate(NotBlank, {message: "The friendly name is required"})
    friendlyName: string;
    @Validate(NotBlank, {message: "The token is required"})
    token: string;
    @Validate(NotBlank, {message: "The endpoint is required"})
    endpoint: string;

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher: ICommandDispatcher,
                @inject("INavigationManager") private navigationManager: INavigationManager,
                @inject("ISettingsManager") private settingsManager: ISettingsManager,
                @inject("IEngineConfig") private engineConfig: IEngineConfig,
                @inject("ICommandsConfig") private commandsConfig: ICommandsConfig) {
        super();
        this.endpoint = this.commandsConfig.endpoint;
        this.token = this.engineConfig.token;
        this.friendlyName = this.engineConfig.friendlyName;
    }

    @Refresh
    setToken(event) {
        this.token = event.target.value;
    }

    @Refresh
    setEndpoint(event) {
        this.endpoint = event.target.value;
    }

    @Refresh
    setFriendlyName(event) {
        this.friendlyName = event.target.value;
    }

    async login() {
        if (!isValid(this)) {
            this.dialogService.alert(validate(this)[0].errorMessage);
            return;
        }

        this.engineConfig.friendlyName = this.friendlyName;
        this.engineConfig.token = this.token;
        this.commandsConfig.endpoint = this.endpoint;

        try {
            let commandResponse: CommandResponse = await this.commandDispatcher.dispatch(new AuthorizationCommand(this.token));
            this.engineConfig.type = commandResponse.response.environment;
            this.settingsManager.setValue("prettygoat_fe_name", this.engineConfig.friendlyName);
            this.settingsManager.setValue("prettygoat_fe_type", this.engineConfig.type);
            this.settingsManager.setValue("prettygoat_fe_token", this.engineConfig.token);
            this.settingsManager.setValue("prettygoat_fe_endpoint", this.commandsConfig.endpoint);
            this.navigationManager.navigate("dashboard");
        }
        catch (error) {
            let messageError: string = "Endpoint not valid";
            this.dialogService.alert(messageError);
        }
    }

    protected onData(item: void): void {

    }
}

export default IndexViewModel;