import expect = require("expect.js");
import {DiagnosticModelRetriever} from "../scripts/DiagnosticModelRetriever";
import {IHttpClient, HttpResponse} from "ninjagoat";
import {IBaseConfigRetriever} from "../scripts/configs/IBaseConfigRetriever";
import {ITokenRetriever} from "../scripts/configs/ITokenRetriever";
import {MockHttpClient} from "./fixtures/MockHttpClient";
import MockBaseConfigRetriever from "./fixtures/MockBaseConfigRetriever";
import MockTokenRetriever from "./fixtures/MockTokenRetriever";
import {ISystemProjection} from "../scripts/projection/ISystemProjection";
import {ModelState} from "ninjagoat-projections";
import {Observable} from "rx";
import * as TypeMoq from "typemoq";
import {IDiagnosticProjection} from "../scripts/projection/IDiagnosticProjection";

describe("Given a DiagnosticModelRetrieverSpec and an observable for System Projection", () => {

    let httpClient: TypeMoq.Mock<IHttpClient>,
        baseConfigRetriever: TypeMoq.Mock<IBaseConfigRetriever>,
        tokenRetriever: TypeMoq.Mock<ITokenRetriever>,
        systemProjection: ISystemProjection,
        subject: DiagnosticModelRetriever;

    beforeEach(() => {
        httpClient = TypeMoq.Mock.ofType(MockHttpClient);
        baseConfigRetriever = TypeMoq.Mock.ofType(MockBaseConfigRetriever);
        tokenRetriever = TypeMoq.Mock.ofType(MockTokenRetriever);
        subject = new DiagnosticModelRetriever(httpClient.object, baseConfigRetriever.object, tokenRetriever.object);
    });

    context("when receive a notification", () => {
        beforeEach(() => {
            systemProjection = {"events": 10, "projections": {"Crop": {"dependencies": []}}};

            baseConfigRetriever.setup(b => b.baseConfig()).returns(() => {return {"endpoint": "testEndpoint"}});
            tokenRetriever.setup(t => t.token()).returns(() => "testToken");

            httpClient.setup(h => h.get(TypeMoq.It.isAnyString(), TypeMoq.It.isAny())).returns(() => {
                return Observable.just(new HttpResponse({
                    "name": "Crop",
                    "size": 10,
                    "humanizedSize": "10 bytes",
                    "events": 0,
                    "readModels": 1,
                    "running": false
                }, 200))
            });
        });

        it("should notify the DiagnosticProjection", () => {
            subject.diagnostic(Observable.just(ModelState.Ready(systemProjection)))
                .subscribe((e: ModelState<IDiagnosticProjection>) => {
                    expect(e.model).to.be.eql({
                        size: 10,
                        processedEvents: 0,
                        processedReadModels: 1,
                        totalSize: '10 bytes',
                        "list": {
                            "Crop": {
                                "name": "Crop",
                                "size": 10,
                                "humanizedSize": "10 bytes",
                                "events": 0,
                                "readModels": 1,
                                "running": false,
                                "dependencies": []
                            }
                        }
                    });
                })
        });
    });
});
