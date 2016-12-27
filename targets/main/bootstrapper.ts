import "bluebird";
import "reflect-metadata";
import {ProjectionsModule} from "ninjagoat-projections";
import {DialogsModule} from "ninjagoat-dialogs";

import AppModule from "../../scripts/AppModule";
import {CommandsModule} from "ninjagoat-commands";
import {Application} from "ninjagoat";

let application = new Application();

application.register(new DialogsModule());
application.register(new CommandsModule());
application.register(new ProjectionsModule());
application.register(new AppModule());
application.run();
