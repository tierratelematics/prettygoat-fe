import {ISocketConfig} from "ninjagoat-projections";

export interface ISocketConfigRetriever{
    getSocketConfig():ISocketConfig;
}