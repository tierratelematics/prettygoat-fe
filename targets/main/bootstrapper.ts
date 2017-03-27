import "reflect-metadata";
import {ProjectionsModule} from "ninjagoat-projections";
import {DialogsModule} from "ninjagoat-dialogs";

import AppModule from "../../scripts/AppModule";
import {CommandsModule} from "ninjagoat-commands";
import {AnalyticsModule} from "ninjagoat-analytics";
import {Application, HttpClient, HttpResponse} from "ninjagoat";
import {MessagesModule} from "ninjagoat-messages";

let application = new Application();

new HttpClient().get("./assets/config/config.json").subscribe((httpResponse: HttpResponse) => {
        application.register(new MessagesModule());
        application.register(new DialogsModule());
        application.register(new CommandsModule());
        application.register(new ProjectionsModule());
        application.register(new AnalyticsModule());
        application.register(new AppModule(httpResponse.response));
        application.run();
    });

