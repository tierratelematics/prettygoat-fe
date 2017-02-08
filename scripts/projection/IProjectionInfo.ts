export interface IProjectionInfo {
    size: string;
    humanizedSize: string;
    events: number;
    readModels: number;
    running: boolean;
    splits: number;
    dependencies: string[];
}