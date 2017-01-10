export interface IProjectionStats {
    size: string;
    events: number;
    readModels: number;
    dependencies: string[];
    status: string;
    splits: number;
}