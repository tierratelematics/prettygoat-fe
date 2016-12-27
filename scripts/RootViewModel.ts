import {ObservableViewModel, ViewModel} from "ninjagoat";
import {inject} from "inversify";
import {NinjagoatDialogService} from "ninjagoat-dialogs";
import {INavigationManager} from "ninjagoat";
import {IDialogService} from "ninjagoat-dialogs";
import {ISettingsManager} from "ninjagoat";

@ViewModel("Root")
class RootViewModel extends ObservableViewModel<Date> {

    public currentDate: string;

    constructor(@inject("IDialogService") public dialogService:NinjagoatDialogService,
                @inject("INavigationManager") private navigationManager: INavigationManager,
                @inject("ISettingsManager") private settingsManager: ISettingsManager) { super(); }

    protected onData(data: Date): void {

    }

    logout():void{
        this.settingsManager.setValue<string>("tokenAPI","");
        this.navigationManager.navigate("Index");
    }

    getToken():string{
        return this.settingsManager.getValue<string>("tokenAPI");
    }
}

export default RootViewModel;