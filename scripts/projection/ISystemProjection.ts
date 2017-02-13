import {Dictionary} from "ninjagoat";
import {ISystemInfo} from "./ISystemInfo";

export interface ISystemProjection {
    events: number;
    projections: Dictionary<ISystemInfo>;
}