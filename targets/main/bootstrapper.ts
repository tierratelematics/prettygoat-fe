/// <reference path="../../typings/index.d.ts" />
import "bluebird";
import "reflect-metadata";
import {ProjectionsModule} from "ninjagoat-projections";
import {TranslationsModule, LocalizedApplication} from "ninjagoat-translations";
import {DialogsModule} from "ninjagoat-dialogs";

import AppModule from "../../scripts/AppModule";
import {CommandsModule} from "ninjagoat-commands";

let application = new LocalizedApplication();

application.register(new TranslationsModule());
application.register(new DialogsModule());
application.register(new CommandsModule());
application.register(new ProjectionsModule());
application.register(new AppModule());
application.run();
