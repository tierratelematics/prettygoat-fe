import {IProjectionInfo} from "./IProjectionInfo";

export interface IProjectionPanel {
    title: string;
    projection: IProjectionInfo;
    stop(name:string): void;
    pause(name:string): void;
    resume(name:string): void;
    saveSnapshot(name:string): void;
    deleteSnapshot(name:string): void;
    dependencies(projection:IProjectionInfo): void;
}