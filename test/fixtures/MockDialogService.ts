import {IDialogService, DialogStatus} from "ninjagoat-dialogs";
import {IPromise} from "rx";

export class MockDialogService implements IDialogService {

    alert(message: string, title?: string): IPromise<DialogStatus> {
        return Promise.resolve(null);
    }

    confirm(message: string, title?: string): IPromise<DialogStatus> {
        return Promise.resolve(null);
    }

    display(key: string, data: any, message: string, title?: string): IPromise<DialogStatus> {
        return Promise.resolve(null);
    }

}
