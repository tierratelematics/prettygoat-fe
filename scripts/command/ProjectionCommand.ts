import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";

@command.Type("StopProjection")
@command.Endpoint("/api/projections/stop")
@command.Transport(Transport.HTTP_Post)
export class StopProjectionCommand {
    projectionName: string;

    constructor(projectionName: string) {
        this.projectionName = projectionName;
    }
}


@command.Type("RestartProjection")
@command.Endpoint("/api/projections/restart")
@command.Transport(Transport.HTTP_Post)
export class RestartProjectionCommand {
    projectionName: string;

    constructor(projectionName: string) {
        this.projectionName = projectionName;
    }
}

@command.Type("StatsProjection")
@command.Endpoint("/api/projections/stats")
export class StatsProjectionCommand {
    projectionName: string;

    constructor(projectionName: string) {
        this.projectionName = projectionName;
    }
}
