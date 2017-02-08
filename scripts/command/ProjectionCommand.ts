import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";

@command.Type("PauseProjection")
@command.Endpoint("/api/projections/pause")
@command.Transport(Transport.HTTP_Post)
export class PauseProjectionCommand {
    projectionName: string;

    constructor(projectionName: string) {
        this.projectionName = projectionName;
    }
}


@command.Type("StopProjection")
@command.Endpoint("/api/projections/stop")
@command.Transport(Transport.HTTP_Post)
export class StopProjectionCommand {
    projectionName: string;

    constructor(projectionName: string) {
        this.projectionName = projectionName;
    }
}


@command.Type("ResumeProjection")
@command.Endpoint("/api/projections/resume")
@command.Transport(Transport.HTTP_Post)
export class ResumeProjectionCommand {
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
