import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";

@command.Type("PauseProjection")
@command.Endpoint("/api/projections/pause")
@command.Transport(Transport.HTTP_Post)
export class PauseProjectionCommand {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}


@command.Type("StopProjection")
@command.Endpoint("/api/projections/stop")
@command.Transport(Transport.HTTP_Post)
export class StopProjectionCommand {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}


@command.Type("ResumeProjection")
@command.Endpoint("/api/projections/resume")
@command.Transport(Transport.HTTP_Post)
export class ResumeProjectionCommand {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
