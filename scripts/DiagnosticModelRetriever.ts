import {inject, injectable} from "inversify";
import {ModelState, IModelRetriever} from "ninjagoat-projections";
import {IHttpClient, Dictionary, ViewModelContext} from "ninjagoat";
import {IBaseConfigRetriever} from "./configs/IBaseConfigRetriever";
import {ITokenRetriever} from "./configs/ITokenRetriever";
import {Observable} from "rx";
import {IProjectionStats} from "./projection/IProjectionStats";

@injectable()
export class DiagnosticModelRetriever implements IModelRetriever {

    constructor(@inject("IHttpClient") private httpClient: IHttpClient,
                @inject("IBaseConfigRetriever") private baseConfigRetriever: IBaseConfigRetriever,
                @inject("ITokenRetriever") private tokenRetriever: ITokenRetriever) {
    }

    modelFor(context: ViewModelContext): Observable<ModelState<Dictionary<IProjectionStats>>> {
        let headers: Dictionary<string> = {'Authorization': this.tokenRetriever.token()};

        return Observable.timer(0, 5000)
            .flatMap(() => this.httpClient.get(this.baseConfigRetriever.baseConfig().endpoint + "/api/projections/list", headers))
            .map<any, any>(httpResponse => httpResponse.response)
            .flatMap<any, any>((projections: string[]) => this.projectionStats(projections))
            .map(model => ModelState.Ready(model))
            .startWith(ModelState.Loading());
    }

    private projectionStats(projections: string[]): Observable<IProjectionStats[]> {
        let header: Dictionary<string> = {'Authorization': this.tokenRetriever.token()};
        let endpoint = this.baseConfigRetriever.baseConfig().endpoint + "/api/projections/stats/";

        return Observable.from(projections)
            .flatMap<any, any>((nameProjection: string) => {
                return this.httpClient.get(endpoint + encodeURIComponent(nameProjection), header)
            })
            .map<any, any>(httpResponse => httpResponse.response)
            .toArray();
    }
}