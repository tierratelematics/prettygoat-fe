import {inject, injectable} from "inversify";
import {ModelState, ModelPhase} from "ninjagoat-projections";
import {IHttpClient, Dictionary, HttpResponse} from "ninjagoat";
import {IBaseConfigRetriever} from "./configs/IBaseConfigRetriever";
import {ISystemProjection} from "./projection/ISystemProjection";
import {ITokenRetriever} from "./configs/ITokenRetriever";
import {IDiagnosticProjection} from "./projection/IDiagnosticProjection";
import {Observable} from "rx";
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
            .flatMap((model: ModelState<ISystemProjection>) => {
                return this.projectionStats(model);
            })
            .combineLatest<ModelState<ISystemProjection>, ModelState<IDiagnosticProjection>>
                (modelObservable, (stats: IProjectionStats[], model: ModelState<ISystemProjection>) => {
                    if (model.phase == ModelPhase.Failed){
                        return ModelState.Failed<IDiagnosticProjection>(null);
                    } else if(model.phase == ModelPhase.Loading){
                        return ModelState.Loading<IDiagnosticProjection>();
                    } else {
                        let diagnosticProjection: IDiagnosticProjection = new DiagnosticProjection();
                        _.forEach(stats, (stats: IProjectionStats) => {
                            console.log(stats, model.model.projections[stats.name].dependencies);
                            diagnosticProjection.merge(stats, model.model.projections[stats.name].dependencies);
                        });
                        return ModelState.Ready<IDiagnosticProjection>(diagnosticProjection);
                    }
            });
    }

    private projectionStats(model: ModelState<ISystemProjection>): Observable<IProjectionStats[]> {
        let header: Dictionary<string> = {'Authorization': this.tokenRetriever.token()};
        let endpoint = this.baseConfigRetriever.baseConfig().endpoint + "/api/projections/stats/";

        return (model.phase!=ModelPhase.Ready) ? Observable.empty<IProjectionStats[]>() :
            Observable.from(_.keys(model.model.projections))
                .flatMap(nameProjection => {
                    return this.httpClient.get(endpoint+nameProjection, header)
                })
                .map<IProjectionStats>(httpResponse => httpResponse.response)
                .toArray();
    }
}