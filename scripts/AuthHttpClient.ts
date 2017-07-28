import {IHttpClient} from "ninjagoat";
import {HttpResponse} from "ninjagoat";
import {Dictionary} from "ninjagoat";
import {inject, injectable} from "inversify";
import {merge} from "lodash";
import {Observable} from "rx";
import IEngineConfig from "./interfaces/IEngineConfig";

@injectable()
class AuthHttpClient implements IHttpClient {

    constructor(@inject("HttpClient") private httpClient:IHttpClient,
                @inject("IEngineConfig") private engineConfig:IEngineConfig) {

    }

    get(url:string, headers?:Dictionary<string>):Observable<HttpResponse> {
        return this.httpClient.get(url, this.mergeAuthorizationHeader(headers));
    }

    post(url:string, body:any, headers?:Dictionary<string>):Observable<HttpResponse> {
        return this.httpClient.post(url, body, this.mergeAuthorizationHeader(headers));
    }

    put(url:string, body:any, headers?:Dictionary<string>):Observable<HttpResponse> {
        return this.httpClient.put(url, body, this.mergeAuthorizationHeader(headers));
    }

    delete(url:string, headers?:Dictionary<string>):Observable<HttpResponse> {
        return this.httpClient.delete(url, this.mergeAuthorizationHeader(headers));
    }

    private mergeAuthorizationHeader(headers:Dictionary<string>):Dictionary<string> {
        let accessToken = this.engineConfig.token;
        return accessToken ? merge({
            Authorization: accessToken
        }, headers) : headers;
    }
}

export default AuthHttpClient