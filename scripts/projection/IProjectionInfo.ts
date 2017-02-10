import {ISystemInfo} from "./ISystemInfo";

export interface IProjectionInfo extends ISystemInfo {
    size: string;
    humanizedSize: string;
    events: number;
    readModels: number;
    running: boolean;
    splits: number;
}