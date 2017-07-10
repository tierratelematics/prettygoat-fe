import {injectable, inject} from "inversify";
import {IRouteStrategy, ISettingsManager} from "ninjagoat";
import {RegistryEntry} from "ninjagoat";
import {RouterState} from "react-router";

@injectable()
class AuthRouteStrategy implements IRouteStrategy {

    constructor(@inject("ISettingsManager") private settingsManager: ISettingsManager) {
    }

    enter(entry: RegistryEntry<any>, nextState: RouterState): Promise<string> {
        let needsAuthorization = <boolean>Reflect.getMetadata("ninjagoat:authorized", entry.construct);
        if (!needsAuthorization) return Promise.resolve("");
        return Promise.resolve(this.settingsManager.getValue<string>("tokenAPI")).then(
            (token: string) => {
                if (!token) return "/";
                return "";
            }
        );
    }

}

export default AuthRouteStrategy