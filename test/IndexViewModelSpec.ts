import "reflect-metadata";
import * as Bluebird from "bluebird";
import expect = require("expect.js");
import * as TypeMoq from "typemoq";
import IndexViewModel from "../scripts/IndexViewModel";
import {IDialogService} from "ninjagoat-dialogs";
import {ISettingsManager, INavigationManager} from "ninjagoat";
import {MockDialogService} from "./fixtures/MockDialogService";
import MockSettingsManager from "./fixtures/MockSettingsManager";
import {ICommandDispatcher, CommandResponse} from "ninjagoat-commands";
import MockCommandDispatcher from "./fixtures/MockCommandDispatcher";
import {MockNavigationManager} from "./fixtures/MockNavigationManager";
import AuthorizationCommand from "../scripts/command/AuthorizationCommand";

describe('Given a Index ViewModel', () => {
    let subject: IndexViewModel,
        dialogService: TypeMoq.Mock<IDialogService>,
        navigationManager: TypeMoq.Mock<INavigationManager>,
        commandDispatcher: TypeMoq.Mock<ICommandDispatcher>,
        settingsManager: TypeMoq.Mock<ISettingsManager>,
        authorizationCommand: Object;

    beforeEach(() => {
            dialogService = TypeMoq.Mock.ofType(MockDialogService);
            settingsManager = TypeMoq.Mock.ofType(MockSettingsManager);
            commandDispatcher = TypeMoq.Mock.ofType(MockCommandDispatcher);
            navigationManager = TypeMoq.Mock.ofType(MockNavigationManager);
            subject = new IndexViewModel(dialogService.object, commandDispatcher.object, navigationManager.object, settingsManager.object);
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
                dialogService.verify(d => d.alert(TypeMoq.It.isAny()), TypeMoq.Times.once());
                settingsManager.verify(s => s.setValue<any>(TypeMoq.It.isAny(), TypeMoq.It.isAny()), TypeMoq.Times.never());
                navigationManager.verify(n => n.navigate("dashboard"), TypeMoq.Times.never());
            });
        });

        context("and all mandatory fields are filled", () => {
            beforeEach(() => {
                subject.setToken({target: {value: "token"}});
                authorizationCommand = new AuthorizationCommand("token");
            });

            context('and authorization command failed', () => {
                beforeEach(() => {
                    commandDispatcher.setup(d => d.dispatch(TypeMoq.It.isValue(authorizationCommand))).throws(new Error());
                });

                it('a error should display', () => {
                    subject.doLogin();
                    commandDispatcher.verify(d => d.dispatch(TypeMoq.It.isValue(authorizationCommand)), TypeMoq.Times.once());
                    dialogService.verify(d => d.alert(TypeMoq.It.isAnyString()), TypeMoq.Times.once());
                    settingsManager.verify(s => s.setValue<string>("tokenAPI", ""), TypeMoq.Times.once());
                    navigationManager.verify(n => n.navigate("dashboard"), TypeMoq.Times.never());
                });
            });

            context("and authorization command doesn't failed", () => {
                beforeEach(() => {
                    let response: Bluebird<CommandResponse> =
                        Bluebird.resolve<CommandResponse>({response: {environment: "production"}});
                    commandDispatcher.setup(d => d.dispatch(TypeMoq.It.isValue(authorizationCommand))).returns(() => response);
                });

                it("should save user's credentials", async() => {
                    await subject.doLogin();
                    commandDispatcher.verify(d => d.dispatch(TypeMoq.It.isValue(authorizationCommand)), TypeMoq.Times.once());
                    dialogService.verify(d => d.alert(TypeMoq.It.isAnyString()), TypeMoq.Times.never());
                    navigationManager.verify(n => n.navigate("dashboard"), TypeMoq.Times.once());
                });
            });

        });
    });
});