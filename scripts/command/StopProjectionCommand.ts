import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";

@command.Type("StopProjection")
@command.Endpoint("/api/projections/stop")
@command.Transport(Transport.HTTP_Post)
class StopProjectionCommand {
    name:string;

    constructor(name:string){
        this.name=name;
    }
}

export default StopProjectionCommand
