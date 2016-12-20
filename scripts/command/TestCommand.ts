import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";

@command.Type("StopProjections")
@command.Endpoint("/api/projections/stop")
@command.Transport(Transport.HTTP_Post)
class StopProjections {
    name: string;

    constructor(nameProjection: string) {
        this.name = nameProjection;
    }
}

export default StopProjections
