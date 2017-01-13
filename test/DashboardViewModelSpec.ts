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


describe('Given a Dashboard ViewModel and a projection name', () => {
    let subject: DashboardViewModel,
        dialogService: TypeMoq.Mock<IDialogService>,
        commandDispatcher: TypeMoq.Mock<ICommandDispatcher>,
        engineDateRetriever: TypeMoq.Mock<IEngineDataRetriever>,
        socketConfigRetriever: TypeMoq.Mock<ISocketConfigRetriever>,
        errorResponse: CommandResponse;

    beforeEach(
        () => {
            errorResponse = {response: {error: "error generic command"}};
            dialogService = TypeMoq.Mock.ofType(MockDialogService);
            commandDispatcher = TypeMoq.Mock.ofType(MockCommandDispatcher);
            engineDateRetriever = TypeMoq.Mock.ofType(MockEngineDataRetriever);
            socketConfigRetriever = TypeMoq.Mock.ofType(MockSocketConfigRetriever);
            subject = new DashboardViewModel(dialogService.object, commandDispatcher.object,
                engineDateRetriever.object, socketConfigRetriever.object); ///<----
        }
    );

    context("when there isn't a projection with that name", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.reject<CommandResponse>(errorResponse));
        });

        it('every projection command should be displayed a error', async() => {
            await subject.pause("");
            await subject.resume("");
            await subject.saveSnapshot("");
            await subject.applyDeleteSnaphost("");
            dialogService.verify(d => d.alert(errorResponse.response.error), TypeMoq.Times.exactly(4));
        });
    });

    context("when there is a projection with that name", () => {

        context("and i try to send a projection runner command", () => {

            context("and i try to pause a projection", () => {

                context("and the command failed", () => {
                    beforeEach(() => {
                        commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.reject<CommandResponse>(errorResponse));
                    });

                    it('a error should be displayed', async() => {
                        await subject.pause("");
                        dialogService.verify(d => d.alert(errorResponse.response.error), TypeMoq.Times.once());
                    });
                });

                context("and the command not failed", () => {
                    beforeEach(() => {
                        commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.resolve<CommandResponse>(null));
                    });

                    it('a success message should be displayed', async() => {
                        await subject.pause("");
                        dialogService.verify(d => d.alert("Projection now is paused"), TypeMoq.Times.once());
                    });
                });
            });

            context("and i try to resume a projection", () => {

                context("and the command failed", () => {
                    beforeEach(() => {
                        commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.reject<CommandResponse>(errorResponse));
                    });

                    it('a error should be displayed', async() => {
                        await subject.resume("");
                        dialogService.verify(d => d.alert(errorResponse.response.error), TypeMoq.Times.once());
                    });

                });

                context("and the command not failed", () => {
                    beforeEach(() => {
                        commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.resolve<CommandResponse>(null));
                    });

                    it('a success message should be displayed', async() => {
                        await subject.resume("");
                        dialogService.verify(d => d.alert("Projection now is runned"), TypeMoq.Times.once());
                    });

                });
            });
        });

        context("and i try to send a snapshot command", () => {

            context("and i try to create a snapshot", () => {

                context("and the command failed", () => {
                    beforeEach(() => {
                        commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.reject<CommandResponse>(errorResponse));
                    });

                    it('a error should be displayed', async() => {
                        await subject.saveSnapshot("");
                        dialogService.verify(d => d.alert(errorResponse.response.error), TypeMoq.Times.once());
                    });

                });

                context("and the command not failed", () => {
                    beforeEach(() => {
                        commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.resolve<CommandResponse>(null));
                    });

                    it('a success message should be displayed', async() => {
                        await subject.saveSnapshot("");
                        dialogService.verify(d => d.alert("Snapshot created"), TypeMoq.Times.once());
                    });

                });
            });

            context("and i try to remove a snapshot", () => {

                context("and the command failed", () => {
                    beforeEach(() => {
                        commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.reject<CommandResponse>(errorResponse));
                    });

                    it('a error should be displayed', async() => {
                        await subject.applyDeleteSnaphost("");
                        dialogService.verify(d => d.alert(errorResponse.response.error), TypeMoq.Times.once());
                    });

                });

                context("and the command not failed", () => {
                    beforeEach(() => {
                        commandDispatcher.setup(c => c.dispatch(TypeMoq.It.isAny())).returns(() => Bluebird.resolve<CommandResponse>(null));
                    });

                    it('a success message should be displayed', async() => {
                        await subject.applyDeleteSnaphost("");
                        dialogService.verify(d => d.alert("Snapshot removed"), TypeMoq.Times.once());
                    });

                });
            });
        });

    });


});