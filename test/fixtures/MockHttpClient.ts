import {Observable, Promise} from "rx"
import {Dictionary, IHttpClient, HttpResponse} from "ninjagoat"

export class MockHttpClient implements IHttpClient {
    public getMethodExecuted: boolean = false;

    get(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        this.getMethodExecuted = true;
        return Observable.fromPromise<HttpResponse>(Promise.resolve({}))
    }

    post(url: string, body: any, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return null
    }

    put(url: string, body: any, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return null
    }

    delete(url: string, headers?: Dictionary<string>): Rx.Observable<HttpResponse> {
        return null
    }
}
