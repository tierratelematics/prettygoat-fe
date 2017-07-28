import {IBaseConfigRetriever} from "./IBaseConfigRetriever";
import {ISocketConfigRetriever} from "./ISocketConfigRetriever";
import {ISocketConfig} from "ninjagoat-projections";
import {ISettingsManager} from "ninjagoat";
import {ITokenRetriever} from "./ITokenRetriever";
import {injectable, inject} from "inversify";
import {IEngineDataRetriever} from "./IEngineDataRetriever";
import IEngineData from "./IEngineData";
import IBaseConfig from "./IBaseConfig";

@injectable()
class ConfigRetriever implements IBaseConfigRetriever,ISocketConfigRetriever, ITokenRetriever, IEngineDataRetriever{

    constructor(@inject("ISettingsManager") private settingsManager: ISettingsManager){
    }

    baseConfig(): IBaseConfig {
        let endPoint:string = this.settingsManager.getValue<string>("endpoint");

        if(!endPoint)
            throw Error("Endpoint non found");

        return {"endpoint":endPoint};
    }

    socketConfig(): ISocketConfig {
        let endPoint:string = this.settingsManager.getValue<string>("endpoint");

        if(!endPoint)
            throw Error("Endpoint or Path non found");

        return {"endpoint":endPoint};
    }


    token(): string {
        return this.settingsManager.getValue<string>("tokenAPI")||"";
    }

    engineData(): IEngineData{
        return this.settingsManager.getValue<IEngineData>("engineData");
    }

}

export default ConfigRetriever