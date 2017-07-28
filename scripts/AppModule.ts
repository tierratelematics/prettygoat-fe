import {interfaces} from "inversify";
import {
    IServiceLocator, IViewModelRegistry, IModule, HttpClient, IHttpClient, ISettingsManager
} from "ninjagoat";
import {Observable} from "rx";
import {ISocketConfig} from "ninjagoat-projections";
import {ICommandsConfig} from "ninjagoat-commands";
import DiagnosticViewModel from "./viewmodels/DashboardViewModel";
import IndexViewModel from "./viewmodels/IndexViewModel";
import RootViewModel from "./viewmodels/MasterViewModel";
import {StatsModelRetriever} from "./StatsModelRetriever";
import {INotificationManager, ModelContext} from "chupacabras";
import AuthHttpClient from "./AuthHttpClient";
import IEngineConfig from "./interfaces/IEngineConfig";

class AppModule implements IModule {
    modules = (container: interfaces.Container) => {

        container.bind<ISocketConfig>("ISocketConfig").toConstantValue(null);
        container.bind<ICommandsConfig>("ICommandsConfig").toConstantValue(<ICommandsConfig>{});

        container.unbind("IHttpClient");
        container.bind<IHttpClient>("HttpClient").to(HttpClient).inSingletonScope().whenInjectedInto(AuthHttpClient);
        container.bind<IHttpClient>("IHttpClient").to(AuthHttpClient).inSingletonScope();

        container.unbind("SocketIOClient.Socket");
        container.bind<SocketIOClient.Socket>("SocketIOClient.Socket").toDynamicValue(() => null);

        container.bind<StatsModelRetriever>("StatsModelRetriever").to(StatsModelRetriever).inSingletonScope();

        container.bind<IEngineConfig>("IEngineConfig").toConstantValue(<IEngineConfig>{});
        container.bind<{}>("Views").toConstantValue(require('../views/export'));
    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
        let statsModelRetriever = serviceLocator.get<StatsModelRetriever>("StatsModelRetriever"),
            settingsManager = serviceLocator.get<ISettingsManager>("ISettingsManager"),
            engineConfig = serviceLocator.get<IEngineConfig>("IEngineConfig"),
            commandsConfig = serviceLocator.get<ICommandsConfig>("ICommandsConfig");

        engineConfig.token = settingsManager.getValue("prettygoat_fe_token", "");
        engineConfig.friendlyName = settingsManager.getValue("prettygoat_fe_name", "");
        engineConfig.type = settingsManager.getValue("prettygoat_fe_type", "");
        commandsConfig.endpoint = settingsManager.getValue("prettygoat_fe_endpoint", "");

        registry.master(RootViewModel, context => Observable.empty());
        registry.index(IndexViewModel, context => Observable.empty());
        registry.add(DiagnosticViewModel, context => statsModelRetriever.modelFor(context)).forArea("dashboard");
    }
}

export default AppModule;