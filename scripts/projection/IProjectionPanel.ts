import {IProjectionStats} from "./IProjectionStats";

export interface IProjectionPanel {
    title: string;
    projection: IProjectionStats;
    stop(): void;
    pause(): void;
    resume(): void;
    saveSnapshot(): void;
    deleteSnapshot(): void;
}