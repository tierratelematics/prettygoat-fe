import {interfaces} from "inversify";
import {
    IServiceLocator, IRouteStrategy, IViewModelRegistry, IModule, HttpClient, IHttpClient
} from "ninjagoat";
import {Observable} from "rx";
import {ISocketConfig, IModelRetriever} from "ninjagoat-projections";
import {CommandDispatcher} from "ninjagoat-commands";
import DiagnosticViewModel from "./DashboardViewModel";
import ApiCommandDispatcher from "./command/ApiCommandDispatcher";
import AuthRouteStrategy from "./shared/AuthRouteStrategy";
import IndexViewModel from "./IndexViewModel";
import RootViewModel from "./RootViewModel";
import {IBaseConfigRetriever} from "./configs/IBaseConfigRetriever";
import {ISocketConfigRetriever} from "./configs/ISocketConfigRetriever";
import ConfigRetriever from "./configs/ConfigRetriever";
import {ITokenRetriever} from "./configs/ITokenRetriever";
import {IEngineDataRetriever} from "./configs/IEngineDataRetriever";
import {DiagnosticModelRetriever} from "./DiagnosticModelRetriever";
import IBaseConfig from "./configs/IBaseConfig";
import {INotificationManager, ModelContext} from "chupacabras";

class AppModule implements IModule {
    modules = (container: interfaces.Container) => {

        container.bind<IBaseConfig>("IBaseConfig").toConstantValue(null);
        container.bind<ISocketConfig>("ISocketConfig").toConstantValue(null);

        container.unbind("IHttpClient");
        container.bind<IHttpClient>("IHttpClient").to(HttpClient);

        container.unbind("CommandDispatcher");
        container.bind<CommandDispatcher>("CommandDispatcher").to(ApiCommandDispatcher).inSingletonScope();

        container.unbind("IRouteStrategy");
        container.bind<IRouteStrategy>("IRouteStrategy").to(AuthRouteStrategy).inSingletonScope();

        container.unbind("SocketIOClient.Socket");
        container.bind<SocketIOClient.Socket>("SocketIOClient.Socket").toDynamicValue(() => null);

        container.bind<IBaseConfigRetriever>("IBaseConfigRetriever").to(ConfigRetriever).inSingletonScope();
        container.bind<ISocketConfigRetriever>("ISocketConfigRetriever").to(ConfigRetriever).inSingletonScope();
        container.bind<ITokenRetriever>("ITokenRetriever").to(ConfigRetriever).inSingletonScope();
        container.bind<IEngineDataRetriever>("IEngineDataRetriever").to(ConfigRetriever).inSingletonScope();
        container.bind<DiagnosticModelRetriever>("DiagnosticModelRetriever").to(DiagnosticModelRetriever).inSingletonScope();

        container.bind<{}>("Views").toConstantValue(require('../views/export'));
    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
        let modelRetriever = serviceLocator.get<IModelRetriever>("IModelRetriever");
        let diagnosticModelRetriever: DiagnosticModelRetriever = serviceLocator.get<DiagnosticModelRetriever>("DiagnosticModelRetriever");

        registry.master(RootViewModel, context => Observable.empty());
        registry.index(IndexViewModel, context => Observable.empty());
        registry.add(DiagnosticViewModel,context => diagnosticModelRetriever.modelFor(context)).forArea("dashboard");
    }
}

export default AppModule;