import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";

@command.Type("ResumeProjection")
@command.Endpoint("/api/projections/resume")
@command.Transport(Transport.HTTP_Post)
class ResumeProjectionCommand {
    name:string;

    constructor(name:string){
        this.name=name;
    }
}

export default ResumeProjectionCommand
