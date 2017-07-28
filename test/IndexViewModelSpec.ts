import "reflect-metadata";
import expect = require("expect.js");
import {IMock, Mock, Times, It} from "typemoq";
import {IDialogService} from "ninjagoat-dialogs";
import {ISettingsManager, INavigationManager} from "ninjagoat";
import IndexViewModel from "../scripts/viewmodels/IndexViewModel";
import {CommandResponse, ICommandDispatcher} from "ninjagoat-commands";
import AuthorizationCommand from "../scripts/commands/AuthorizationCommand";

describe('Given a Index ViewModel', () => {
    let subject: IndexViewModel,
        dialogService: IMock<IDialogService>,
        navigationManager: IMock<INavigationManager>,
        commandDispatcher: IMock<ICommandDispatcher>,
        settingsManager: IMock<ISettingsManager>,
        authorizationCommand: Object;

    beforeEach(() => {
            dialogService = Mock.ofType<IDialogService>();
            settingsManager = Mock.ofType<ISettingsManager>();
            commandDispatcher = Mock.ofType<ICommandDispatcher>();
            navigationManager = Mock.ofType<INavigationManager>();
            subject = new IndexViewModel(dialogService.object, commandDispatcher.object,
                navigationManager.object, settingsManager.object);
        }
    );

    context('when i try to login', () => {
        beforeEach(() => {
            subject.setFriendlyName({target: {value: "friendlyName"}});
            subject.setEndPoint({target: {value: "endpoint"}});
            subject.setPath({target: {value: "path"}});
        });

        context("and some mandatory fields are missing", () => {
            it('a validation error should displayed', () => {
                subject.doLogin();
                dialogService.verify(d => d.alert(It.isAny()), Times.once());
                settingsManager.verify(s => s.setValue<any>(It.isAny(), It.isAny()), Times.never());
                navigationManager.verify(n => n.navigate("dashboard"), Times.never());
            });
        });

        context("and all mandatory fields are filled", () => {
            beforeEach(() => {
                subject.setToken({target: {value: "token"}});
                authorizationCommand = new AuthorizationCommand("token");
            });

            context('and authorization command failed', () => {
                beforeEach(() => {
                    commandDispatcher.setup(d => d.dispatch(It.isValue(authorizationCommand))).throws(new Error());
                });

                it('a error should display', () => {
                    subject.doLogin();
                    commandDispatcher.verify(d => d.dispatch(It.isValue(authorizationCommand)), Times.once());
                    dialogService.verify(d => d.alert(It.isAnyString()), Times.once());
                    settingsManager.verify(s => s.setValue<string>("tokenAPI", ""), Times.once());
                    navigationManager.verify(n => n.navigate("dashboard"), Times.never());
                });
            });

            context("and authorization command doesn't failed", () => {
                beforeEach(() => {
                    let response: Promise<CommandResponse> =
                        Promise.resolve<CommandResponse>({response: {environment: "production"}});
                    commandDispatcher.setup(d => d.dispatch(It.isValue(authorizationCommand))).returns(() => response);
                });

                it("should save user's credentials", async () => {
                    await subject.doLogin();
                    commandDispatcher.verify(d => d.dispatch(It.isValue(authorizationCommand)), Times.once());
                    dialogService.verify(d => d.alert(It.isAnyString()), Times.never());
                    navigationManager.verify(n => n.navigate("dashboard"), Times.once());
                });
            });

        });
    });
});