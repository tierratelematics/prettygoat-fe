import "reflect-metadata";
import expect = require("expect.js");
import * as TypeMoq from "typemoq";
import * as Bluebird from "bluebird";
import DashboardViewModel from "../scripts/DashboardViewModel";
import {IDialogService} from "ninjagoat-dialogs";
import {ICommandDispatcher, CommandResponse} from "ninjagoat-commands";
import {IEngineDataRetriever} from "../scripts/configs/IEngineDataRetriever";
import {ISocketConfigRetriever} from "../scripts/configs/ISocketConfigRetriever";
import {MockEngineDataRetriever} from "./fixtures/MockEngineDataRetriever";
import {MockSocketConfigRetriever} from "./fixtures/MockSocketConfigRetriever";
import MockCommandDispatcher from "./fixtures/MockCommandDispatcher";
import {MockDialogService} from "./fixtures/MockDialogService";


describe("Given a Dashboard ViewModel", () => {
    let subject: DashboardViewModel,
        dialogService: TypeMoq.Mock<IDialogService>,
        commandDispatcher: TypeMoq.Mock<ICommandDispatcher>,
        engineDateRetriever: TypeMoq.Mock<IEngineDataRetriever>,
        socketConfigRetriever: TypeMoq.Mock<ISocketConfigRetriever>,
        errorResponse: CommandResponse;

    beforeEach(() => {
            errorResponse = {response: {error: "error generic"}};
            dialogService = TypeMoq.Mock.ofType(MockDialogService);
            commandDispatcher = TypeMoq.Mock.ofType(MockCommandDispatcher);
            engineDateRetriever = TypeMoq.Mock.ofType(MockEngineDataRetriever);
            socketConfigRetriever = TypeMoq.Mock.ofType(MockSocketConfigRetriever);
            subject = new DashboardViewModel(dialogService.object, commandDispatcher.object,
                engineDateRetriever.object, socketConfigRetriever.object);
        }
    );

    context("when I try to alter the state of an inexistent projection or command failed", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.reject<CommandResponse>(errorResponse));
        });

        it("it should display a error", async() => {
            await subject.sendCommand(null, "successMessage");
            dialogService.verify(d => d.alert(errorResponse.response.error), TypeMoq.Times.once());
            dialogService.verify(d => d.alert("successMessage"), TypeMoq.Times.never());
        });
    });

    context("when a projection is paused", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.pause("nameProjection");
            dialogService.verify(d => d.alert("Projection now is paused"), TypeMoq.Times.once());
        });
    });

    context("when a projection is resumed", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.resume("nameProjection");
            dialogService.verify(d => d.alert("Projection now is runned"), TypeMoq.Times.once());
        });
    });

    context("when a snapshot is created", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.saveSnapshot("nameProjection");
            dialogService.verify(d => d.alert("Snapshot created"), TypeMoq.Times.once());
        });
    });

    context("when a snapshot is removed", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.applyDeleteSnaphost("nameProjection");
            dialogService.verify(d => d.alert("Snapshot removed"), TypeMoq.Times.once());
        });
    });
});