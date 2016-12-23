import {INotificationManager, Notification, ISocketConfig} from "ninjagoat-projections";
import * as Rx from "rx";
import {ViewModelContext, IObjectContainer, ISettingsManager} from "ninjagoat";
import {injectable, inject} from "inversify";
import * as io from "socket.io-client";


@injectable()
class ApiNotificationManager implements INotificationManager{
    socketEndPoint:string;

    constructor(@inject("SocketIOClient.Socket") private client:SocketIOClient.Socket,
                @inject("ISocketConfig") private socketConfig: ISocketConfig,
                @inject("ISettingsManager") private settingsManager: ISettingsManager,
                @inject("IObjectContainer") private container: IObjectContainer
    ) {
        this.socketConfig.endpoint = this.settingsManager.getValue<string>("endpoint");
        this.socketConfig.path = this.settingsManager.getValue<string>("path");
        this.socketEndPoint = "";
    }

    notificationsFor(context:ViewModelContext):Rx.Observable<Notification> {
        this.subscribeToChannel(context);
        return this.getNotificationStream(context).finally(() => this.unsubscribeFromChannel(context));
    }

    protected getNotificationStream(context:ViewModelContext):Rx.Observable<Notification> {
        this.updateClientSocket();
        console.log("GET NOTIFICATION STREAM",context.area,context.viewmodelId,this.client);
        return Rx.Observable.fromEvent<Notification>(this.client, `${context.area}:${context.viewmodelId}`);
    }

    private subscribeToChannel(context:ViewModelContext):void {
        this.operateOnChannel('subscribe', context);
    }

    private unsubscribeFromChannel(context:ViewModelContext):void {
        this.operateOnChannel('unsubscribe', context);
    }

    private operateOnChannel(operation:string, context:ViewModelContext):void {
        this.updateClientSocket();
        // console.log("OPERATE ON CHANNEL",this.client);
        this.client.emit(operation, {
            area: context.area,
            viewmodelId: context.viewmodelId,
            parameters: context.parameters
        });
    }

    private updateClientSocket():void{
        if(this.socketEndPoint!=this.socketConfig.endpoint+this.socketConfig.path){
            this.socketEndPoint = this.socketConfig.endpoint+this.socketConfig.path;
            this.container.set<SocketIOClient.Socket>("SocketIOClient.Socket",
                io.connect(this.socketConfig.endpoint, {path: this.socketConfig.path || "/socket.io"}));
            console.log("NEW SOCKET CLIENT",this.socketEndPoint);
        }
    }

}

export default ApiNotificationManager