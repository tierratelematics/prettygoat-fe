import {IProjectionStats} from "./IProjectionStats";

export interface IProjectionListItem {
    stats: IProjectionStats;

    stop(name: string): void;

    restart(name: string): void;

    saveSnapshot(name: string): void;

    deleteSnapshot(name: string): void;
}