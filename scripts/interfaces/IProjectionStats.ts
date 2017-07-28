export interface IProjectionStats {
    name: string;
    size: number;
    humanizedSize: string;
    events: number;
    running: boolean;
    failed: boolean;
    lastEvent: string;
    realtime: boolean;
}