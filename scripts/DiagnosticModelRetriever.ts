import {inject, injectable} from "inversify";
import {ModelState, ModelPhase} from "ninjagoat-projections";
import {IHttpClient, Dictionary, HttpResponse} from "ninjagoat";
import {IBaseConfigRetriever} from "./configs/IBaseConfigRetriever";
import {ISystemProjection} from "./projection/ISystemProjection";
import {ITokenRetriever} from "./configs/ITokenRetriever";
import {IDiagnosticProjection} from "./projection/IDiagnosticProjection";
import {Observable} from "rx";
import * as _ from "lodash";

@injectable()
export class DiagnosticModelRetriever {

    constructor(@inject("IHttpClient") private httpClient: IHttpClient,
                @inject("IBaseConfigRetriever") private baseConfigRetriever: IBaseConfigRetriever,
                @inject("ITokenRetriever") private tokenRetriever: ITokenRetriever) {
    }

    diagnostic(modelObservable: Observable<ModelState<ISystemProjection>>): Observable<ModelState<IDiagnosticProjection>> {
        return modelObservable
            .flatMap((model: ModelState<ISystemProjection>) => {
                return this.projectionStats(model);
            })
            .combineLatest(modelObservable, (response: HttpResponse, model: ModelState<ISystemProjection>) => {
                if (model.phase == ModelPhase.Failed)
                    return ModelState.Failed<IDiagnosticProjection>(model.failure);
                else if (model.phase == ModelPhase.Loading)
                    return ModelState.Loading<IDiagnosticProjection>();
                return ModelState.Ready<IDiagnosticProjection>(null);
            });
    }

    private projectionStats(model: ModelState<ISystemProjection>): Observable<HttpResponse> {
        let header: Dictionary<string> = {'Authorization': this.tokenRetriever.token()};
        let endpoint = this.baseConfigRetriever.baseConfig().endpoint + "/api/projections/stats/";

        return (model.phase!=ModelPhase.Ready) ? Observable.empty<HttpResponse>() : Observable.from(_.keys(model.model.projections))
                .flatMap(nameProjection => {
                    return this.httpClient.get(endpoint+nameProjection, header)
                });
    }
}