import {IProjectionList} from "./IProjectionList";

export interface IDiagnosticProjection {
    processedEvents: number;
    processedReadModels:number;
    totalSize:string;
    list: IProjectionList
}