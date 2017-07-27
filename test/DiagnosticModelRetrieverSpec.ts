import expect = require("expect.js");
import {IMock, Mock, Times, It} from "typemoq";
import {DiagnosticModelRetriever} from "../scripts/DiagnosticModelRetriever";
import {IHttpClient, HttpResponse} from "ninjagoat";
import {IBaseConfigRetriever} from "../scripts/configs/IBaseConfigRetriever";
import {ITokenRetriever} from "../scripts/configs/ITokenRetriever";
import MockBaseConfigRetriever from "./fixtures/MockBaseConfigRetriever";
import MockTokenRetriever from "./fixtures/MockTokenRetriever";
import {ISystemProjection} from "../scripts/projection/ISystemProjection";
import {ModelState} from "ninjagoat-projections";
import {Observable} from "rxjs";
import {IDiagnosticProjection} from "../scripts/projection/IDiagnosticProjection";
import IBaseConfig from "../scripts/configs/IBaseConfig";

describe("Given a DiagnosticModelRetrieverSpec and an observable for System Projection", () => {

    let httpClient: IMock<IHttpClient>,
        baseConfigRetriever: IMock<IBaseConfigRetriever>,
        tokenRetriever: IMock<ITokenRetriever>,
        systemProjection: ISystemProjection,
        baseConfig: IBaseConfig,
        subject: DiagnosticModelRetriever;

    beforeEach(() => {
        httpClient = Mock.ofType<IHttpClient>();
        baseConfigRetriever = Mock.ofType(MockBaseConfigRetriever);
        tokenRetriever = Mock.ofType(MockTokenRetriever);
        subject = new DiagnosticModelRetriever(httpClient.object, baseConfigRetriever.object, tokenRetriever.object);
    });

    context("when receive a notification", () => {
        beforeEach(() => {
            systemProjection = {"events": 10, "projections": {"Crop": {"dependencies": []}}};
            baseConfig = {"endpoint": "testEndpoint"};

            baseConfigRetriever.setup(b => b.baseConfig()).returns(() => baseConfig);
            tokenRetriever.setup(t => t.token()).returns(() => "testToken");

            httpClient.setup(h => h.get("testEndpoint/api/projections/stats/Crop", It.isAny())).returns(() => {
                return Observable.of(new HttpResponse({
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
            subject.diagnostic(Observable.of(ModelState.Ready(systemProjection)))
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
