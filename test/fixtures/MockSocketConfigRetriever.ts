import {ISocketConfigRetriever} from "../../scripts/configs/ISocketConfigRetriever";
import {ISocketConfig} from "ninjagoat-projections";

export class MockSocketConfigRetriever implements ISocketConfigRetriever{

    socketConfig(): ISocketConfig {
        return null;
    }
}