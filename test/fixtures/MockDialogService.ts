import {IDialogService, DialogStatus} from "ninjagoat-dialogs";

export class MockDialogService implements IDialogService {
    alert(message: string, title?: string): Promise<DialogStatus> {
        return null;
    }

    confirm(message: string, title?: string): Promise<DialogStatus> {
        return null;
    }

    display(key: string, data: any, message: string, title?: string): Promise<DialogStatus> {
        return null;
    }
}
