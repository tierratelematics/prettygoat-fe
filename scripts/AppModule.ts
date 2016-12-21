import {IViewModelRegistry, IModule} from "ninjagoat";
import {interfaces} from "inversify";
import IndexViewModel from "./IndexViewModel";
import * as Rx from "rx";
import RootViewModel from "./RootViewModel";
import {IServiceLocator} from "ninjagoat";
import {IBaseConfig} from "ninjagoat";
import {IModelRetriever} from "ninjagoat-projections";
import {ISocketConfig} from "ninjagoat-projections";
import DiagnosticViewModel from "./DiagnosticViewModel";
import {ITranslationsConfig} from "ninjagoat-translations";
import {IApiCommandConfig} from "./configs/IApiCommandConfig";
import {CommandDispatcher} from "ninjagoat-commands";
import ApiCommandDispatcher from "./command/ApiCommandDispatcher";
import {IRouteStrategy} from "ninjagoat";
import AuthRouteStrategy from "./Authorization/AuthRouteStrategy";

class AppModule implements IModule {

    modules = (kernel:interfaces.Kernel) => {
        let config = require('../settings/config.json');

        kernel.bind<IBaseConfig>("IBaseConfig").toConstantValue(config.base);
        kernel.bind<ISocketConfig>("ISocketConfig").toConstantValue(config.websocket);
        kernel.bind<ITranslationsConfig>("ITranslationsConfig").toConstantValue(config.translations);

        kernel.unbind("CommandDispatcher");
        kernel.bind<CommandDispatcher>("CommandDispatcher").to(ApiCommandDispatcher).inSingletonScope();

        kernel.unbind("IRouteStrategy");
        kernel.bind<IRouteStrategy>("IRouteStrategy").to(AuthRouteStrategy).inSingletonScope();

        kernel.bind<{}>("Views").toConstantValue(require('../views/export'));
    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {
        let modelRetriever = serviceLocator.get<IModelRetriever>("IModelRetriever");
        registry.master(RootViewModel, context => Rx.Observable.empty());
        registry.index(IndexViewModel, context => Rx.Observable.empty());
        registry.add(DiagnosticViewModel, context => modelRetriever.modelFor<any[]>(context)).forArea("__diagnostic");
    }
}

export default AppModule;