import {IProjectionInfo} from "./IProjectionInfo";
import {Dictionary} from "ninjagoat";

export interface IDiagnosticProjection {
    processedEvents: number;
    processedReadModels: number;
    totalSize: string;
    list: Dictionary<IProjectionInfo>
}