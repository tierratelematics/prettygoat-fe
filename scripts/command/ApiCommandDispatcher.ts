import {injectable, inject} from "inversify";
import {IDateRetriever, IBaseConfig, IGUIDGenerator, IHttpClient, ISettingsManager, Dictionary} from "ninjagoat";
import {CommandResponse,CommandDispatcher,CommandEnvelope,Transport} from "ninjagoat-commands";
import {IApiCommandConfig} from "../configs/IApiCommandConfig";
import * as Promise from "bluebird";
import {IBaseConfigRetriever} from "../configs/IBaseConfigRetriever";
import {ITokenRetriever} from "../configs/ITokenRetriever";

@injectable()
class ApiCommandDispatcher extends CommandDispatcher {

    constructor(@inject("IDateRetriever") dateRetriever: IDateRetriever,
                @inject("IGUIDGenerator") guidGenerator: IGUIDGenerator,
                @inject("IHttpClient") private httpClient: IHttpClient,
                @inject("IBaseConfig") private config: IBaseConfig,
                @inject("IBaseConfigRetriever") private baseConfigRetriever: IBaseConfigRetriever,
                @inject("ITokenRetriever") private tokenRetriever: ITokenRetriever) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command: Object): boolean {
        return this.transport === Transport.HTTP_Post && !this.authentication;
    }

    executeCommand(envelope: CommandEnvelope): Promise<CommandResponse> {
        this.config = this.baseConfigRetriever.baseConfig();
        let apiCommandConfig: Dictionary<string> = {'Authorization': this.tokenRetriever.token()};
        return <Promise<CommandResponse>>this.httpClient.post(this.config.endpoint + this.endpoint, envelope, apiCommandConfig).toPromise();
    }

}

export default ApiCommandDispatcher