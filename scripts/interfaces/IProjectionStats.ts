export interface IProjectionStats {
    name: string;
    size: number;
    humanizedSize: string;
    events: number;
    running: boolean;
    failed: boolean;
    lastEvents: Event[];
    realtime: boolean;
}

export interface Event<T = any> {
    id?: string;
    type: string;
    payload: T;
    timestamp: Date;
    metadata?: any;
}
