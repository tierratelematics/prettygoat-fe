import {injectable,inject} from "inversify";
import {IRouteStrategy,ISettingsManager} from "ninjagoat";
import RouterState = ReactRouter.RouterState;
import {RegistryEntry} from "ninjagoat";
import {INavigationManager} from "ninjagoat";
import * as Promise from "bluebird";

@injectable()
class AuthRouteStrategy implements IRouteStrategy {

    constructor(@inject("ISettingsManager") private settingsManager: ISettingsManager,
                @inject("INavigationManager") private navigationManager: INavigationManager) {
    }

    enter(entry: RegistryEntry<any>, nextState: RouterState): Promise<string> {
        let needsAuthorization = <boolean>Reflect.getMetadata("ninjagoat:authorized", entry.construct);
        if (!needsAuthorization) return Promise.resolve("");
        return Promise.resolve(this.settingsManager.getValue<string>("tokenAPI")).then(
            (token:string) => {
                if(!token) this.navigationManager.navigate("Index");
                return "";
            }
        );
    }

}

export default AuthRouteStrategy