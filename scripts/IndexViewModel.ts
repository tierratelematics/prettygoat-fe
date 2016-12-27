import {ObservableViewModel, ViewModel, ISettingsManager} from "ninjagoat";
import {ModelState, ISocketConfig} from "ninjagoat-projections";
import {autobind} from "core-decorators";
import {IDialogService} from "ninjagoat-dialogs";
import {inject} from "inversify";
import {ICommandDispatcher} from "ninjagoat-commands";
import {IBaseConfig} from "ninjagoat";
import {INavigationManager} from "ninjagoat";
import AuthorizationCommand from "./command/AuthorizationCommand";
import {Validate, validate, isValid} from "class-validator";
import {NotBlank} from "../customValidators/CustomValidators";

@autobind
@ViewModel("Index")
class IndexViewModel extends ObservableViewModel<ModelState<any[]>> {

    @Validate(NotBlank, { message: "The Token is required" })
    token:string;
    @Validate(NotBlank, { message: "The Endpoint is required" })
    endPoint:string;
    @Validate(NotBlank, { message: "The Path is required" })
    path:string;

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher:ICommandDispatcher,
                @inject("IBaseConfig") private config:IBaseConfig,
                @inject("ISocketConfig") private socketConfig:ISocketConfig,
                @inject("INavigationManager") private navigationManager: INavigationManager,
                @inject("ISettingsManager") private settingsManager: ISettingsManager
    ) {
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

    enterLogin(){
        if(!isValid(this)){
            this.dialogService.alert(validate(this)[0].errorMessage);
            return;
        }

        this.config['endpoint'] = this.endPoint;
        this.socketConfig['endpoint'] = this.endPoint;
        this.socketConfig['path'] = this.path;
        this.settingsManager.setValue<string>("tokenAPI",this.token);

        this.commandDispatcher.dispatch(new AuthorizationCommand(this.token)).then(
            (value) => {
                this.navigationManager.navigate("__diagnostic","size");
            },
            (error) => {
                this.settingsManager.setValue<string>("tokenAPI","");
                this.dialogService.alert("API Key or Endpoint not valid");
            }
        );
    }

    protected onData(item:ModelState<any[]>):void {

    }
}

export default IndexViewModel;