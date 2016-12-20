import {ProjectionRunnerStatus} from "./ProjectionRunnerStatus";

export interface IProjectionStats{
    size:string;
    events:number;
    readModels:number;
    status:ProjectionRunnerStatus;
}