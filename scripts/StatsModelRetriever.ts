import {inject, injectable} from "inversify";
import {ModelState, IModelRetriever} from "ninjagoat-projections";
import {IHttpClient, Dictionary, ViewModelContext} from "ninjagoat";
import {Observable} from "rx";
import {IProjectionStats} from "./interfaces/IProjectionStats";
import {ICommandsConfig} from "ninjagoat-commands";

@injectable()
export class StatsModelRetriever implements IModelRetriever {

    constructor(@inject("IHttpClient") private httpClient: IHttpClient,
                @inject("ICommandsConfig") private commandsConfig: ICommandsConfig) {
    }

    modelFor(context: ViewModelContext): Observable<ModelState<Dictionary<IProjectionStats[]>>> {
        let endpoint = this.commandsConfig.endpoint;

        return Observable.timer(0, 5000)
            .flatMap(() => this.httpClient.get(endpoint + "/api/projections/list"))
            .map(httpResponse => httpResponse.response)
            .flatMap((projections: string[]) => {
                return Observable.from(projections)
                    .concatMap(name => this.httpClient.get(endpoint + "/api/projections/stats/" + encodeURIComponent(name)))
                    .map(httpResponse => httpResponse.response)
                    .toArray();
            })
            .map(model => ModelState.Ready(model))
            .catch(error => Observable.just(ModelState.Failed(error)))
            .startWith(ModelState.Loading());
    }
}