import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";
import {Event} from "ninjagoat-analytics";

@command.Type("StopProjection")
@command.Endpoint("/api/projections/stop")
@command.Transport(Transport.HTTP_Post)
@Event("projections", "stopProjection", "stop")
export class StopProjectionCommand {
    projectionName: string;

    constructor(projectionName: string) {
        this.projectionName = projectionName;
    }
}


@command.Type("RestartProjection")
@command.Endpoint("/api/projections/restart")
@command.Transport(Transport.HTTP_Post)
@Event("projections", "restartProjection", "restart")
export class RestartProjectionCommand {
    projectionName: string;

    constructor(projectionName: string) {
        this.projectionName = projectionName;
    }
}

@command.Type("StatsProjection")
@command.Endpoint("/api/projections/stats")
@Event("projections", "statsProjection", "stats")
export class StatsProjectionCommand {
    projectionName: string;

    constructor(projectionName: string) {
        this.projectionName = projectionName;
    }
}
