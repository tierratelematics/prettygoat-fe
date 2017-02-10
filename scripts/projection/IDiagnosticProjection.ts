import {ISystemProjection} from "./ISystemProjection";
import {IProjectionInfo} from "./IProjectionInfo";
import {Dictionary} from "ninjagoat";

export interface IDiagnosticProjection extends ISystemProjection {
    processedEvents: number;
    processedReadModels: number;
    totalSize: string;
    list: Dictionary<IProjectionInfo>
}