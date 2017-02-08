import {injectable, inject} from "inversify";
import {IDateRetriever, IBaseConfig, IGUIDGenerator, IHttpClient, Dictionary} from "ninjagoat";
import {CommandResponse, CommandDispatcher, CommandEnvelope, Transport} from "ninjagoat-commands";
import * as Promise from "bluebird";
import {IBaseConfigRetriever} from "../configs/IBaseConfigRetriever";
import {ITokenRetriever} from "../configs/ITokenRetriever";

@injectable()
class GetCommandDispatcher extends CommandDispatcher {

    constructor(@inject("IDateRetriever") dateRetriever: IDateRetriever,
                @inject("IGUIDGenerator") guidGenerator: IGUIDGenerator,
                @inject("IHttpClient") private httpClient: IHttpClient,
                @inject("IBaseConfig") private config: IBaseConfig,
                @inject("IBaseConfigRetriever") private baseConfigRetriever: IBaseConfigRetriever,
                @inject("ITokenRetriever") private tokenRetriever: ITokenRetriever) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command: Object): boolean {
        return this.transport === !Transport.HTTP_Post && !this.authentication;
    }

    executeCommand(envelope: CommandEnvelope): Promise<CommandResponse> {
        this.config = this.baseConfigRetriever.baseConfig();
        let apiCommandConfig: Dictionary<string> = {'Authorization': this.tokenRetriever.token()};
        return <Promise<CommandResponse>>this.httpClient.get(this.getEndpoint(envelope), apiCommandConfig).toPromise();
    }

    private getEndpoint(envelope: CommandEnvelope){
        let endpoint = this.config.endpoint + this.endpoint + (envelope.payload.projectionName) ? "/"+ envelope.payload.projectionName : "";
        return (!envelope.payload.projectionName) ? endpoint : `${endpoint}/${envelope.payload.projectionName}`;
    }

}

export default GetCommandDispatcher