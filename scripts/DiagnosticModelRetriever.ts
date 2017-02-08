import {inject, injectable} from "inversify";
import {IModelRetriever, ModelState} from "ninjagoat-projections";
import {IHttpClient, ViewModelContext, Dictionary} from "ninjagoat";
import {IBaseConfigRetriever} from "./configs/IBaseConfigRetriever";
import {Observable} from "rx";
import {ISystemProjection} from "./projection/ISystemProjection";
import {ITokenRetriever} from "./configs/ITokenRetriever";

@injectable();
export class DiagnosticModelRetriever implements IModelRetriever{

    constructor(@inject("IHttpClient") private httpClient:IHttpClient,
                @inject("ModelRetriever") private modelRetriver:IModelRetriever,
                @inject("IBaseConfigRetriever") private baseConfigRetriever: IBaseConfigRetriever,
                @inject("ITokenRetriever") private tokenRetriever: ITokenRetriever){
    }


    modelFor<T>(context: ViewModelContext): Observable<ModelState<T>> {
        this.config = this.baseConfigRetriever.baseConfig();
        let header: Dictionary<string> = {'Authorization': this.tokenRetriever.token()};
        this.modelRetriver.modelFor<ISystemProjection>(context);
    }
}