import {ObservableViewModel, ViewModel} from "ninjagoat";
import {inject} from "inversify";
import {NinjagoatDialogService} from "ninjagoat-dialogs";

@ViewModel("Root")
class RootViewModel extends ObservableViewModel<Date> {

    public currentDate: string;

    constructor(@inject("IDialogService") public dialogService:NinjagoatDialogService) { super(); }

    protected onData(data: Date): void {

    }
}

export default RootViewModel;
