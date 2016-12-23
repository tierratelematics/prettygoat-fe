import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";

@command.Type("SaveSnapshot")
@command.Endpoint("/api/snapshots/save")
@command.Transport(Transport.HTTP_Post)
export class SaveSnapshotCommand {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}


@command.Type("DeleteSnapshot")
@command.Endpoint("/api/snapshots/delete")
@command.Transport(Transport.HTTP_Post)
export class DeleteSnapshotCommand {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}