import {IDiagnosticProjection} from "./IDiagnosticProjection";
import {Dictionary} from "ninjagoat";
import {IProjectionInfo} from "./IProjectionInfo";
import {IProjectionStats} from "./IProjectionStats";
import * as _ from "lodash";
const humanize = require("humanize");

class DiagnosticProjection implements IDiagnosticProjection {
    processedEvents: number;
    processedReadModels: number;
    totalSize: string;
    list: Dictionary<IProjectionInfo>;
    private size: number = 0;

    constructor() {
        this.processedEvents = 0;
        this.processedReadModels = 0;
        this.totalSize = "";
        this.list = {};
    }

    merge(stats: IProjectionStats, dependencies: string[]) {
        this.processedEvents += stats.events;
        this.processedReadModels += stats.readModels;
        this.size += stats.size;
        this.totalSize = humanize.filesize(this.size);
        this.list[stats.name] = _.assign({}, stats, {dependencies: dependencies});
    }
}

export default DiagnosticProjection;