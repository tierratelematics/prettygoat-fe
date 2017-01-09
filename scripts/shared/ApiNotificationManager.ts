import {INotificationManager, Notification, ISocketConfig} from "ninjagoat-projections";
import * as Rx from "rx";
import {ViewModelContext, IObjectContainer} from "ninjagoat";
import {injectable, inject} from "inversify";
import * as io from "socket.io-client";
import {ISocketConfigRetriever} from "../configs/ISocketConfigRetriever";

@injectable()
class ApiNotificationManager implements INotificationManager {
    socketEndPoint: string = "";

    constructor(@inject("SocketIOClient.Socket") private client: SocketIOClient.Socket,
                @inject("ISocketConfig") private socketConfig: ISocketConfig,
                @inject("IObjectContainer") private container: IObjectContainer,
                @inject("ISocketConfigRetriever") private socketConfigRetriever: ISocketConfigRetriever) {
    }

    notificationsFor(context: ViewModelContext): Rx.Observable<Notification> {
        this.subscribeToChannel(context);
        return this.getNotificationStream(context).finally(() => this.unsubscribeFromChannel(context));
    }

    protected getNotificationStream(context: ViewModelContext): Rx.Observable<Notification> {
        this.updateClientSocket();
        return Rx.Observable.fromEvent<Notification>(this.client, `${context.area}:${context.viewmodelId}`);
    }

    private subscribeToChannel(context: ViewModelContext): void {
        this.operateOnChannel('subscribe', context);
    }

    private unsubscribeFromChannel(context: ViewModelContext): void {
        this.operateOnChannel('unsubscribe', context);
    }

    private operateOnChannel(operation: string, context: ViewModelContext): void {
        this.updateClientSocket();
        this.client.emit(operation, {
            area: context.area,
            viewmodelId: context.viewmodelId,
            parameters: context.parameters
        });
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