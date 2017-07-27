import {inject, injectable} from "inversify";
import {ModelState, ModelPhase} from "ninjagoat-projections";
import {IHttpClient, Dictionary} from "ninjagoat";
import {IBaseConfigRetriever} from "./configs/IBaseConfigRetriever";
import {ISystemProjection} from "./projection/ISystemProjection";
import {ITokenRetriever} from "./configs/ITokenRetriever";
import {IDiagnosticProjection} from "./projection/IDiagnosticProjection";
import {Observable} from "rxjs";
import {IProjectionStats} from "./projection/IProjectionStats";
import DiagnosticProjection from "./projection/DiagnosticProjection";
import * as _ from "lodash";

@injectable()
export class DiagnosticModelRetriever {

    constructor(@inject("IHttpClient") private httpClient: IHttpClient,
                @inject("IBaseConfigRetriever") private baseConfigRetriever: IBaseConfigRetriever,
                @inject("ITokenRetriever") private tokenRetriever: ITokenRetriever) {
    }

    diagnostic(modelObservable: Observable<ModelState<ISystemProjection>>): Observable<ModelState<IDiagnosticProjection>> {
        return modelObservable
            .flatMap<any, any>((model: ModelState<ISystemProjection>) => {
                return this.projectionStats(model);
            })
            .combineLatest(modelObservable, (stats: IProjectionStats[], model: ModelState<ISystemProjection>) => {
                if (model.phase == ModelPhase.Failed) {
                    return ModelState.Failed<IDiagnosticProjection>(model.failure);
                } else if (model.phase == ModelPhase.Loading) {
                    return ModelState.Loading<IDiagnosticProjection>();
                } else {
                    let diagnosticProjection: IDiagnosticProjection = new DiagnosticProjection();
                    _.forEach(stats, (stats: IProjectionStats) => {
                        diagnosticProjection.merge(stats, model.model.projections[stats.name].dependencies);
                    });
                    return ModelState.Ready<IDiagnosticProjection>(diagnosticProjection);
                }
            });
    }

    private projectionStats(model: ModelState<ISystemProjection>): Observable<IProjectionStats[]> {
        let header: Dictionary<string> = {'Authorization': this.tokenRetriever.token()};
        let endpoint = this.baseConfigRetriever.baseConfig().endpoint + "/api/projections/stats/";

        return (model.phase != ModelPhase.Ready) ? Observable.empty<IProjectionStats[]>() :
            Observable.from(_.keys(model.model.projections))
                .flatMap<any, any>((nameProjection: string) => {
                    return this.httpClient.get(endpoint + encodeURIComponent(nameProjection), header)
                })
                .map<any, any>(httpResponse => httpResponse.response)
                .toArray();
    }
}