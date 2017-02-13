export interface IProjectionStats {
    name: string;
    size: number;
    humanizedSize: string;
    events: number;
    readModels: number;
    running: boolean;
    splits?: number;
}