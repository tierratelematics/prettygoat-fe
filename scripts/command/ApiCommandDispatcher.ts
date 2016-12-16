import {injectable, inject} from "inversify";
import {IDateRetriever} from "ninjagoat";
import {IGUIDGenerator} from "ninjagoat";
import {IHttpClient} from "ninjagoat";
import {CommandResponse} from "ninjagoat-commands";
import {CommandDispatcher} from "ninjagoat-commands";
import {IApiCommandConfig} from "../configs/IApiCommandConfig";
import {CommandEnvelope} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";
import {IBaseConfig} from "ninjagoat";

@injectable()
class ApiCommandDispatcher extends CommandDispatcher {

    constructor(@inject("IDateRetriever") dateRetriever:IDateRetriever,
                @inject("IGUIDGenerator") guidGenerator:IGUIDGenerator,
                @inject("IHttpClient") private httpClient:IHttpClient,
                @inject("IBaseConfig") private config:IBaseConfig,
                @inject("IApiCommandConfig") private apiCommandConfig:IApiCommandConfig) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Object):boolean {
        return this.transport === Transport.HTTP_Post && !this.authentication;
    }

    executeCommand(envelope:CommandEnvelope):Promise<CommandResponse> {
        return <Promise<CommandResponse>>this.httpClient.post(this.config.endpoint + this.endpoint, envelope, this.apiCommandConfig).toPromise();
    }

}

export default ApiCommandDispatcher