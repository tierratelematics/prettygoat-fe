import * as Rx from "rx";
import {interfaces} from "inversify";
import {IServiceLocator, IBaseConfig, IRouteStrategy, IViewModelRegistry, IModule, ViewModelContext} from "ninjagoat";
import {IModelRetriever, INotificationManager, ISocketConfig} from "ninjagoat-projections";
import {CommandDispatcher} from "ninjagoat-commands";
import DiagnosticViewModel from "./DashboardViewModel";
import ApiCommandDispatcher from "./command/ApiCommandDispatcher";
import AuthRouteStrategy from "./shared/AuthRouteStrategy";
import ApiNotificationManager from "./shared/ApiNotificationManager";
import IndexViewModel from "./IndexViewModel";
import RootViewModel from "./RootViewModel";
import {IDiagnosticProjection} from "./projection/IDiagnosticProjection";
import {IBaseConfigRetriever} from "./configs/IBaseConfigRetriever";
import {ISocketConfigRetriever} from "./configs/ISocketConfigRetriever";
import ConfigRetriever from "./configs/ConfigRetriever";
import {ITokenRetriever} from "./configs/ITokenRetriever";
import {IEngineDataRetriever} from "./configs/IEngineDataRetriever";

class AppModule implements IModule {

    modules = (container: interfaces.Container) => {

        container.bind<IBaseConfig>("IBaseConfig").toConstantValue(null);
        container.bind<ISocketConfig>("ISocketConfig").toConstantValue(null);

        container.unbind("CommandDispatcher");
        container.bind<CommandDispatcher>("CommandDispatcher").to(ApiCommandDispatcher).inSingletonScope();

        container.unbind("IRouteStrategy");
        container.bind<IRouteStrategy>("IRouteStrategy").to(AuthRouteStrategy).inSingletonScope();

        container.unbind("INotificationManager");
        container.bind<INotificationManager>("INotificationManager").to(ApiNotificationManager).inSingletonScope();

        container.unbind("SocketIOClient.Socket");
        container.bind<SocketIOClient.Socket>("SocketIOClient.Socket").toDynamicValue(() => {
            return null;
        });

        container.bind<IBaseConfigRetriever>("IBaseConfigRetriever").to(ConfigRetriever).inSingletonScope();
        container.bind<ISocketConfigRetriever>("ISocketConfigRetriever").to(ConfigRetriever).inSingletonScope();
        container.bind<ITokenRetriever>("ITokenRetriever").to(ConfigRetriever).inSingletonScope();
        container.bind<IEngineDataRetriever>("IEngineDataRetriever").to(ConfigRetriever).inSingletonScope();

        container.bind<{}>("Views").toConstantValue(require('../views/export'));
    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
        let modelRetriever = serviceLocator.get<IModelRetriever>("IModelRetriever");
        registry.master(RootViewModel, context => Rx.Observable.empty());
        registry.index(IndexViewModel, context => Rx.Observable.empty());
        registry.add(DiagnosticViewModel,
            () => modelRetriever.modelFor<IDiagnosticProjection>(new ViewModelContext("__diagnostic", "Size"))).forArea("dashboard");
    }
}

export default AppModule;