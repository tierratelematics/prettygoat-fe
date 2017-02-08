import {inject, injectable} from "inversify";
import {IModelRetriever, ModelState} from "ninjagoat-projections";
import {IHttpClient, ViewModelContext, Dictionary, IBaseConfig} from "ninjagoat";
import {IBaseConfigRetriever} from "./configs/IBaseConfigRetriever";
import {ISystemProjection} from "./projection/ISystemProjection";
import {ITokenRetriever} from "./configs/ITokenRetriever";
import {Observable} from "rx";

@injectable()
export class DiagnosticModelRetriever implements IModelRetriever {

    constructor(@inject("IHttpClient") private httpClient: IHttpClient,
                @inject("IModelRetriever") private modelRetriver: IModelRetriever,
                @inject("IBaseConfigRetriever") private baseConfigRetriever: IBaseConfigRetriever,
                @inject("ITokenRetriever") private tokenRetriever: ITokenRetriever) {
    }

    modelFor<T>(context: ViewModelContext): Observable<ModelState<T>> {
        let config: IBaseConfig = this.baseConfigRetriever.baseConfig();
        let header: Dictionary<string> = {'Authorization': this.tokenRetriever.token()};
        this.modelRetriver.modelFor<ISystemProjection>(context)
            .do(notification => {
                console.log(notification);
            });

        return Observable.just(null);
    }
}