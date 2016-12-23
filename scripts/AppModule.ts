import {IViewModelRegistry, IModule} from "ninjagoat";
import {interfaces} from "inversify";
import IndexViewModel from "./IndexViewModel";
import * as Rx from "rx";
import RootViewModel from "./RootViewModel";
import {IServiceLocator} from "ninjagoat";
import {IBaseConfig} from "ninjagoat";
import {IModelRetriever, INotificationManager} from "ninjagoat-projections";
import {ISocketConfig} from "ninjagoat-projections";
import DiagnosticViewModel from "./DiagnosticViewModel";
import {ITranslationsConfig} from "ninjagoat-translations";
import {CommandDispatcher} from "ninjagoat-commands";
import ApiCommandDispatcher from "./command/ApiCommandDispatcher";
import {IRouteStrategy} from "ninjagoat";
import AuthRouteStrategy from "./Authorization/AuthRouteStrategy";
import ApiNotificationManager from "./notification/ApiNotificationManager";

class AppModule implements IModule {

    modules = (container:interfaces.Container) => {
        let config = require('../settings/config.json');

        container.bind<IBaseConfig>("IBaseConfig").toConstantValue(config.base);
        container.bind<ISocketConfig>("ISocketConfig").toConstantValue(config.websocket);
        container.bind<ITranslationsConfig>("ITranslationsConfig").toConstantValue(config.translations);

        container.unbind("CommandDispatcher");
        container.bind<CommandDispatcher>("CommandDispatcher").to(ApiCommandDispatcher).inSingletonScope();

        container.unbind("IRouteStrategy");
        container.bind<IRouteStrategy>("IRouteStrategy").to(AuthRouteStrategy).inSingletonScope();

        container.unbind("INotificationManager");
        container.bind<INotificationManager>("INotificationManager").to(ApiNotificationManager).inSingletonScope();

        container.bind<{}>("Views").toConstantValue(require('../views/export'));
    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
        let modelRetriever = serviceLocator.get<IModelRetriever>("IModelRetriever");
        registry.master(RootViewModel, context => Rx.Observable.empty());
        registry.index(IndexViewModel, context => Rx.Observable.empty());
        registry.add(DiagnosticViewModel, context => modelRetriever.modelFor<any[]>(context)).forArea("__diagnostic");
    }
}

export default AppModule;