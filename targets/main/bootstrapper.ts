import "reflect-metadata";
import {ProjectionsModule} from "ninjagoat-projections";
import {DialogsModule} from "ninjagoat-dialogs";

import AppModule from "../../scripts/AppModule";
import {CommandsModule} from "ninjagoat-commands";
import {Application} from "ninjagoat";
import {MessagesModule} from "ninjagoat-messages";

let application = new Application();
application.register(new MessagesModule());
application.register(new DialogsModule());
application.register(new CommandsModule());
application.register(new ProjectionsModule());
application.register(new AppModule());
application.run();

