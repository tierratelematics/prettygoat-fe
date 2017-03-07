import "reflect-metadata";
import expect = require("expect.js");
import * as TypeMoq from "typemoq";
import * as _ from "lodash";
import DashboardViewModel from "../scripts/DashboardViewModel";
import {IDialogService} from "ninjagoat-dialogs";
import {ICommandDispatcher, CommandResponse} from "ninjagoat-commands";
import {IEngineDataRetriever} from "../scripts/configs/IEngineDataRetriever";
import {ISocketConfigRetriever} from "../scripts/configs/ISocketConfigRetriever";
import {MockEngineDataRetriever} from "./fixtures/MockEngineDataRetriever";
import {MockSocketConfigRetriever} from "./fixtures/MockSocketConfigRetriever";
import MockCommandDispatcher from "./fixtures/MockCommandDispatcher";
import {MockDialogService} from "./fixtures/MockDialogService";
import DiagnosticProjection from "../scripts/projection/DiagnosticProjection";
import {IMessagesService} from "ninjagoat-messages";
import MockMessagesService from "./fixtures/MockMessagesService";


describe("Given a Dashboard ViewModel", () => {
    let subject: DashboardViewModel,
        dialogService: TypeMoq.Mock<IDialogService>,
        commandDispatcher: TypeMoq.Mock<ICommandDispatcher>,
        engineDateRetriever: TypeMoq.Mock<IEngineDataRetriever>,
        socketConfigRetriever: TypeMoq.Mock<ISocketConfigRetriever>,
        messagesService: TypeMoq.Mock<IMessagesService>,
        errorResponse: CommandResponse;

    beforeEach(() => {
        errorResponse = {response: {error: "error generic"}};
        dialogService = TypeMoq.Mock.ofType(MockDialogService);
        commandDispatcher = TypeMoq.Mock.ofType(MockCommandDispatcher);
        engineDateRetriever = TypeMoq.Mock.ofType(MockEngineDataRetriever);
        socketConfigRetriever = TypeMoq.Mock.ofType(MockSocketConfigRetriever);
        messagesService = TypeMoq.Mock.ofType(MockMessagesService);
        subject = new DashboardViewModel(dialogService.object, commandDispatcher.object,
            engineDateRetriever.object, socketConfigRetriever.object, messagesService.object);

        subject.model = _.assign({}, new DiagnosticProjection(), {
            "list": {
                "nameProjection": {
                    "name": "nameProjection",
                    "size": 10,
                    "humanizedSize": "10 bytes",
                    "events": 0,
                    "readModels": 1,
                    "running": false,
                    "dependencies": []
                }
            }
        });
    });

    context("when a request to the API fails", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Promise.reject<CommandResponse>(errorResponse));
        });

        it("it should display a error", async() => {
            await subject.sendCommand(null, "successMessage", "nameProjection");
            messagesService.verify(d => d.failure(errorResponse.response.error, "nameProjection"), TypeMoq.Times.once());
            messagesService.verify(d => d.success("successMessage"), TypeMoq.Times.never());
        });
    });

    context("when a projection is stopped", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Promise.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.stop("nameProjection");
            messagesService.verify(d => d.success("Projection now is stopped", "nameProjection"), TypeMoq.Times.once());
            expect(subject.model.list["nameProjection"].running).to.not.be.ok();
        });
    });

    context("when a projection is restarted", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Promise.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.restart("nameProjection");
            messagesService.verify(d => d.success("Projection now is restarted", "nameProjection"), TypeMoq.Times.once());
            expect(subject.model.list["nameProjection"].running).to.be.ok();
        });
    });

    context("when a snapshot is created", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Promise.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.saveSnapshot("nameProjection");
            messagesService.verify(d => d.success("Snapshot created", "nameProjection"), TypeMoq.Times.once());
        });
    });

    context("when a snapshot is removed", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Promise.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.deleteSnapshot("nameProjection");
            messagesService.verify(d => d.success("Snapshot removed", "nameProjection"), TypeMoq.Times.once());
        });
    });
});