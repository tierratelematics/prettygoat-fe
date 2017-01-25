import {IBaseConfig} from "ninjagoat";

export interface IBaseConfigRetriever {
    baseConfig(): IBaseConfig;
}