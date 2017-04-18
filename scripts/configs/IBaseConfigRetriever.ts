import IBaseConfig from "./IBaseConfig";

export interface IBaseConfigRetriever {
    baseConfig(): IBaseConfig;
}