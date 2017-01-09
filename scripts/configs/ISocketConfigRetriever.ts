import {ISocketConfig} from "ninjagoat-projections";

export interface ISocketConfigRetriever {
    socketConfig(): ISocketConfig;
}