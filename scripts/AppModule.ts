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
import {IBaseConfigRetriever} from "./configs/IBaseConfigRetriever";
import {ISocketConfigRetriever} from "./configs/ISocketConfigRetriever";
import ConfigRetriever from "./configs/ConfigRetriever";
import {ITokenRetriever} from "./configs/ITokenRetriever";
import {IEngineDataRetriever} from "./configs/IEngineDataRetriever";
import {IAnalyticsConfig, TrackPageRouteStrategy} from "ninjagoat-analytics";
import {DiagnosticModelRetriever} from "./DiagnosticModelRetriever";
import {ISystemProjection} from "./projection/ISystemProjection";

class AppModule implements IModule {
    config:any;

    constructor(config:any){
        this.config = config;
    }

    modules = (container: interfaces.Container) => {

        container.bind<IBaseConfig>("IBaseConfig").toConstantValue(null);
        container.bind<ISocketConfig>("ISocketConfig").toConstantValue(null);
        container.bind<IAnalyticsConfig>("IAnalyticsConfig").toConstantValue(this.config.analytics);

        container.unbind("CommandDispatcher");
        container.bind<CommandDispatcher>("CommandDispatcher").to(ApiCommandDispatcher).inSingletonScope();

        container.bind<IRouteStrategy>("RouteStrategy").to(AuthRouteStrategy).inSingletonScope().whenInjectedInto(TrackPageRouteStrategy);

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
        container.bind<DiagnosticModelRetriever>("DiagnosticModelRetriever").to(DiagnosticModelRetriever).inSingletonScope();

        container.bind<{}>("Views").toConstantValue(require('../views/export'));
    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
        let modelRetriever = serviceLocator.get<IModelRetriever>("IModelRetriever");
        let diagnosticModelRetriever: DiagnosticModelRetriever = serviceLocator.get<DiagnosticModelRetriever>("DiagnosticModelRetriever");

        registry.master(RootViewModel, context => Rx.Observable.empty());
        registry.index(IndexViewModel, context => Rx.Observable.empty());
        registry.add(DiagnosticViewModel,
            () => diagnosticModelRetriever.diagnostic(modelRetriever.modelFor<ISystemProjection>(new ViewModelContext("__diagnostic", "System")))).forArea("dashboard");
    }
}

export default AppModule;