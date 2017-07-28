import {ObservableViewModel, ViewModel, Refresh} from "ninjagoat";
import {inject} from "inversify";
import {INavigationManager} from "ninjagoat";
import {ISettingsManager} from "ninjagoat";
import IEngineConfig from "../interfaces/IEngineConfig";

@ViewModel("Master")
class MasterViewModel extends ObservableViewModel<void> {

    constructor(@inject("INavigationManager") private navigationManager: INavigationManager,
                @inject("ISettingsManager") private settingsManager: ISettingsManager,
                @inject("IEngineConfig") private engineConfig: IEngineConfig) {
        super();
    }

    @Refresh
    logout(): void {
        this.settingsManager.setValue("prettygoat_fe_name", "");
        this.settingsManager.setValue("prettygoat_fe_type", "");
        this.settingsManager.setValue("prettygoat_fe_token", "");
        this.settingsManager.setValue("prettygoat_fe_endpoint", "");
        this.engineConfig.token = "";
        this.navigationManager.navigate("Index");
    }

    isLogged(): boolean {
        return !!this.engineConfig.token;
    }

    protected onData(data: void): void {
    }
}

export default MasterViewModel;
