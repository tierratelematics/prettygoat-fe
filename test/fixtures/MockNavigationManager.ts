import {INavigationManager, Dictionary} from "ninjagoat";

export class MockNavigationManager implements INavigationManager {

    navigate(area: string, viewmodelId?: string, parameters?: Dictionary<any>): void {

    }

    replace(area: string, viewmodelId?: string, parameters?: Dictionary<any>): void {

    }

    getNavigationPath(area: string, viewmodelId?: string, parameters?: Dictionary<any>): string {
        return "";
    }
}

