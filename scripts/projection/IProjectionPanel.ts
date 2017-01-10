import {IProjectionInfo} from "./IProjectionInfo";

export interface IProjectionPanel {
    title: string;
    projection: IProjectionInfo;
    stop(): void;
    pause(): void;
    resume(): void;
    saveSnapshot(): void;
    deleteSnapshot(): void;
    dependencies(): void;
}