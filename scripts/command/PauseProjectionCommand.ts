import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";

@command.Type("PauseProjection")
@command.Endpoint("/api/projections/pause")
@command.Transport(Transport.HTTP_Post)
class PauseProjectionCommand {
    name:string;

    constructor(name:string){
        this.name=name;
    }
}

export default PauseProjectionCommand
