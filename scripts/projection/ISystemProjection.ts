import {Dictionary} from "ninjagoat";

export interface ISystemProjection {
    events: number;
    list: Dictionary<ISystemInfo>
}

export interface ISystemInfo {
    dependencies: string[];
}