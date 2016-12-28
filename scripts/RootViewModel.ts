import {ObservableViewModel, ViewModel} from "ninjagoat";
import {inject} from "inversify";
import {NinjagoatDialogService} from "ninjagoat-dialogs";
import {INavigationManager} from "ninjagoat";
import {IDialogService} from "ninjagoat-dialogs";
import {ISettingsManager} from "ninjagoat";
import {ITokenRetriever} from "./configs/ITokenRetriever";

@ViewModel("Root")
class RootViewModel extends ObservableViewModel<any> {

    constructor(@inject("IDialogService") public dialogService: NinjagoatDialogService,
                @inject("INavigationManager") private navigationManager: INavigationManager,
                @inject("ISettingsManager") private settingsManager: ISettingsManager,
                @inject("ITokenRetriever") private tokenRetriever: ITokenRetriever) {
        super();
    }

    logout(): void {
        this.settingsManager.setValue<string>("tokenAPI", "");
        this.navigationManager.navigate("Index");
    }

    getToken(): string {
        return this.tokenRetriever.getToken();
    }
}

export default RootViewModel;
