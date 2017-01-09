import {IProjectionStats} from "./IProjectionStats";
import {Dictionary} from "ninjagoat";

export interface IDiagnosticProjection {
    processedEvents: number;
    processedReadModels: number;
    totalSize: string;
    list: Dictionary<IProjectionStats>
}