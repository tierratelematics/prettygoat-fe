import * as Rx from "rx";
import {interfaces} from "inversify";
import {IServiceLocator, IBaseConfig, IRouteStrategy, IViewModelRegistry, IModule} from "ninjagoat";
import {IModelRetriever, INotificationManager, ISocketConfig} from "ninjagoat-projections";
import {CommandDispatcher} from "ninjagoat-commands";
import DiagnosticViewModel from "./DiagnosticViewModel";
import ApiCommandDispatcher from "./command/ApiCommandDispatcher";
import AuthRouteStrategy from "./Authorization/AuthRouteStrategy";
import ApiNotificationManager from "./notification/ApiNotificationManager";
import IndexViewModel from "./IndexViewModel";
import RootViewModel from "./RootViewModel";

class AppModule implements IModule {

    modules = (container: interfaces.Container) => {
        let config = require('../settings/config.json');

        container.bind<IBaseConfig>("IBaseConfig").toConstantValue(config.base);
        container.bind<ISocketConfig>("ISocketConfig").toConstantValue(config.websocket);

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

        container.bind<{}>("Views").toConstantValue(require('../views/export'));
    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
        let modelRetriever = serviceLocator.get<IModelRetriever>("IModelRetriever");
        registry.master(RootViewModel, context => Rx.Observable.empty());
        registry.index(IndexViewModel, context => Rx.Observable.empty());
        registry.add(DiagnosticViewModel, context => modelRetriever.modelFor<any[]>(context)).forArea("__diagnostic");
    }
}

export default AppModule;