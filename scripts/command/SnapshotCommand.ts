import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";
import {Event} from "ninjagoat-analytics";

@command.Type("SaveSnapshot")
@command.Endpoint("/api/snapshots/save")
@command.Transport(Transport.HTTP_Post)
@Event("snapshot", "saveSnapshot", "save")
export class SaveSnapshotCommand {
    projectionName: string;

    constructor(projectionName: string) {
        this.projectionName = projectionName;
    }
}

@command.Type("DeleteSnapshot")
@command.Endpoint("/api/snapshots/delete")
@Event("snapshot", "deleteSnapshot", "delete")
@command.Transport(Transport.HTTP_Post)
export class DeleteSnapshotCommand {
    projectionName: string;

    constructor(projectionName: string) {
        this.projectionName = projectionName;
    }
}