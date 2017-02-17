import {ObservableViewModel, ViewModel} from "ninjagoat";
import {inject} from "inversify";
import {NinjagoatDialogService} from "ninjagoat-dialogs";
import {INavigationManager} from "ninjagoat";
import {IDialogService} from "ninjagoat-dialogs";
import {ISettingsManager} from "ninjagoat";
import {ITokenRetriever} from "./configs/ITokenRetriever";
import {MessagesService} from "ninjagoat-messages";
import {ModelState} from "ninjagoat-projections";

@ViewModel("Root")
class RootViewModel extends ObservableViewModel<any> {

    constructor(@inject("IDialogService") public dialogService: NinjagoatDialogService,
                @inject("INavigationManager") private navigationManager: INavigationManager,
                @inject("ISettingsManager") private settingsManager: ISettingsManager,
                @inject("ITokenRetriever") private tokenRetriever: ITokenRetriever,
                @inject("IMessagesService") public messagesService: MessagesService){
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
