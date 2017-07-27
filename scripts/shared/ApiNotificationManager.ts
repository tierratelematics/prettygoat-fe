import {ISocketConfig} from "ninjagoat-projections";
import {Observable} from "rxjs";
import {IObjectContainer} from "ninjagoat";
import {injectable, inject} from "inversify";
import * as io from "socket.io-client";
import {ISocketConfigRetriever} from "../configs/ISocketConfigRetriever";
import {INotificationManager, Notification, ModelContext} from "chupacabras";

@injectable()
class ApiNotificationManager implements INotificationManager {
    socketEndPoint: string = "";

    constructor(@inject("SocketIOClient.Socket") private client: SocketIOClient.Socket,
                @inject("ISocketConfig") private socketConfig: ISocketConfig,
                @inject("IObjectContainer") private container: IObjectContainer,
                @inject("ISocketConfigRetriever") private socketConfigRetriever: ISocketConfigRetriever) {
    }

    notificationsFor(context: ModelContext): Observable<Notification> {
        this.subscribeToChannel(context);
        return this.getNotificationStream(context).finally(() => this.unsubscribeFromChannel(context));
    }

    protected getNotificationStream(context: ModelContext): Observable<Notification> {
        return Observable.fromEvent<Notification>(this.client, `${context.area}:${context.modelId}`);
    }

    private subscribeToChannel(context: ModelContext): void {
        this.operateOnChannel('subscribe', context);
    }

    private unsubscribeFromChannel(context: ModelContext): void {
        this.operateOnChannel('unsubscribe', context);
    }

    private operateOnChannel(operation: string, context: ModelContext): void {
        this.updateClientSocket();
        this.client.emit(operation, context);
    }

    private updateClientSocket(): void {
        this.socketConfig = this.socketConfigRetriever.socketConfig();
        let socketEndPoint = this.socketConfig.endpoint + this.socketConfig.path;
        if (this.socketEndPoint != socketEndPoint) {
            this.socketEndPoint = socketEndPoint;
            let socketConnection: SocketIOClient.Socket = io.connect(this.socketConfig.endpoint, {path: this.socketConfig.path || "/socket.io"});
            this.container.set<SocketIOClient.Socket>("SocketIOClient.Socket", socketConnection);
            this.client = socketConnection;
        }
    }
}

export default ApiNotificationManager