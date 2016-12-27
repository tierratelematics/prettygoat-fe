import {injectable, inject} from "inversify";
import {IDateRetriever} from "ninjagoat";
import {IGUIDGenerator} from "ninjagoat";
import {IHttpClient} from "ninjagoat";
import {CommandResponse} from "ninjagoat-commands";
import {CommandDispatcher} from "ninjagoat-commands";
import {CommandEnvelope} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";
import {IBaseConfig} from "ninjagoat";
import {ISettingsManager} from "ninjagoat";
import {IApiCommandConfig} from "../configs/IApiCommandConfig";
import * as Promise from "bluebird";

@injectable()
class ApiCommandDispatcher extends CommandDispatcher {

    constructor(@inject("IDateRetriever") dateRetriever: IDateRetriever,
                @inject("IGUIDGenerator") guidGenerator: IGUIDGenerator,
                @inject("IHttpClient") private httpClient: IHttpClient,
                @inject("IBaseConfig") private config: IBaseConfig,
                @inject("ISettingsManager") private settingsManager: ISettingsManager) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command: Object): boolean {
        return this.transport === Transport.HTTP_Post && !this.authentication;
    }

    executeCommand(envelope: CommandEnvelope): Promise<CommandResponse> {
        this.config.endpoint = this.settingsManager.getValue<string>("endpoint");
        let apiCommandConfig: IApiCommandConfig = {'Authorization': this.settingsManager.getValue<string>("tokenAPI")};
        return <Promise<CommandResponse>>this.httpClient.post(this.config.endpoint + this.endpoint, envelope, apiCommandConfig).toPromise();
    }

}

export default ApiCommandDispatcher