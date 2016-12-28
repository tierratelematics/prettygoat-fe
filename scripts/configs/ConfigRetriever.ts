import {IBaseConfigRetriever} from "./IBaseConfigRetriever";
import {ISocketConfigRetriever} from "./ISocketConfigRetriever";
import {ISocketConfig} from "ninjagoat-projections";
import {IBaseConfig, ISettingsManager} from "ninjagoat";
import {ITokenRetriever} from "./ITokenRetriever";
import {injectable, inject} from "inversify";

@injectable()
class ConfigRetriever implements IBaseConfigRetriever,ISocketConfigRetriever, ITokenRetriever{

    constructor(@inject("ISettingsManager") private settingsManager: ISettingsManager){
    }

    getBaseConfig(): IBaseConfig {
        let endPoint:string = this.settingsManager.getValue<string>("endpoint");

        if(!endPoint)
            throw Error("Endpoint non found");

        return {"endpoint":endPoint};
    }

    getSocketConfig(): ISocketConfig {
        let endPoint:string = this.settingsManager.getValue<string>("endpoint");
        let path:string = this.settingsManager.getValue<string>("path");

        if(!endPoint || !path)
            throw Error("Endpoint or Path non found");

        return {"endpoint":endPoint,"path":path};
    }


    getToken(): string {
        return this.settingsManager.getValue<string>("tokenAPI")||"";
    }
}

export default ConfigRetriever