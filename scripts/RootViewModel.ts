import {ObservableViewModel, ViewModel} from "ninjagoat";
import {inject} from "inversify";
import {INavigationManager} from "ninjagoat";
import {ISettingsManager} from "ninjagoat";
import {ITokenRetriever} from "./configs/ITokenRetriever";
import {ModelState} from "ninjagoat-projections";

@ViewModel("Root")
class RootViewModel extends ObservableViewModel<any> {

    constructor(@inject("INavigationManager") private navigationManager: INavigationManager,
                @inject("ISettingsManager") private settingsManager: ISettingsManager,
                @inject("ITokenRetriever") private tokenRetriever: ITokenRetriever){
        super();
    }

    logout(): void {
        this.settingsManager.setValue<string>("tokenAPI", "");
        this.navigationManager.navigate("Index");
    }

    getToken(): string {
        return this.tokenRetriever.token();
    }

    protected onData(data: ModelState<any>): void {
    }
}

export default RootViewModel;
