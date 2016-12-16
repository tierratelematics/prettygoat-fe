import {ObservableViewModel, ViewModel} from "ninjagoat";
import {ModelState} from "ninjagoat-projections";
import {autobind} from "core-decorators";
import {IDialogService} from "ninjagoat-dialogs";
import {inject} from "inversify";
import {ICommandDispatcher} from "ninjagoat-commands";
import {IApiCommandConfig} from "./configs/IApiCommandConfig";
import {IBaseConfig} from "ninjagoat";
import {INavigationManager} from "ninjagoat";
import AuthorizationCommand from "./command/AuthorizationCommand";
import {ISocketConfig} from "prettygoat";

@autobind
@ViewModel("Index")
class IndexViewModel extends ObservableViewModel<ModelState<any[]>> {
    token:string;
    endPoint:string;
    path:string;

    constructor(@inject("IDialogService") private dialogService: IDialogService,
                @inject("ICommandDispatcher") private commandDispatcher:ICommandDispatcher,
                @inject("IApiCommandConfig") private apiCommandConfig:IApiCommandConfig,
                @inject("IBaseConfig") private config:IBaseConfig,
                @inject("ISocketConfig") private socketConfig:ISocketConfig,
                @inject("INavigationManager") private navigationManager: INavigationManager) {
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
        this.apiCommandConfig['Authorization'] = this.token;
        this.config['endpoint'] = this.endPoint;
        this.socketConfig['endpoint'] = this.endPoint;
        this.socketConfig['path'] = this.path;

        this.commandDispatcher.dispatch(new AuthorizationCommand(this.token)).then(
            (value) => {
                this.navigationManager.navigate("__diagnostic","size");
            },
            (error) => {
                this.dialogService.alert("API Key or Endpoint not valid");
            }
        );
    }

    protected onData(item:ModelState<any[]>):void {

    }
}

export default IndexViewModel;