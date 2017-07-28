import "reflect-metadata";
import {IMock, Mock, Times, It} from "typemoq";
import * as _ from "lodash";
import {IDialogService} from "ninjagoat-dialogs";
import {ICommandDispatcher, CommandResponse} from "ninjagoat-commands";
import {IMessagesService} from "ninjagoat-messages";
import DashboardViewModel from "../scripts/viewmodels/DashboardViewModel";


describe("Given a Dashboard ViewModel", () => {
    let subject: DashboardViewModel,
        dialogService: IMock<IDialogService>,
        commandDispatcher: IMock<ICommandDispatcher>,
        messagesService: IMock<IMessagesService>,
        errorResponse: CommandResponse;

    beforeEach(() => {
        errorResponse = {response: {error: "error generic"}};
        dialogService = Mock.ofType<IDialogService>();
        commandDispatcher = Mock.ofType<ICommandDispatcher>();
        messagesService = Mock.ofType<IMessagesService>();
        subject = new DashboardViewModel(dialogService.object, commandDispatcher.object, messagesService.object);

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
            commandDispatcher.setup(c => c.dispatch(It.isAny())).returns(() => Promise.reject<CommandResponse>(errorResponse));
        });

        it("it should display a error", async() => {
            await subject.sendCommand(null, "successMessage", "nameProjection");
            messagesService.verify(d => d.failure(errorResponse.response.error, "nameProjection"), Times.once());
            messagesService.verify(d => d.success("successMessage"), Times.never());
        });
    });

    context("when a projection is stopped", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(It.isAny())).returns(() => Promise.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.stop("nameProjection");
            messagesService.verify(d => d.success("Projection now is stopped", "nameProjection"), Times.once());
        });
    });

    context("when a projection is restarted", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(It.isAny())).returns(() => Promise.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.restart("nameProjection");
            messagesService.verify(d => d.success("Projection now is restarted", "nameProjection"), Times.once());
        });
    });

    context("when a snapshot is created", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(It.isAny())).returns(() => Promise.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.saveSnapshot("nameProjection");
            messagesService.verify(d => d.success("Snapshot created", "nameProjection"), Times.once());
        });
    });

    context("when a snapshot is removed", () => {
        beforeEach(() => {
            commandDispatcher.setup(c => c.dispatch(It.isAny())).returns(() => Promise.resolve<CommandResponse>(null));
        });

        it("it should display a success message", async() => {
            await subject.deleteSnapshot("nameProjection");
            messagesService.verify(d => d.success("Snapshot removed", "nameProjection"), Times.once());
        });
    });
});