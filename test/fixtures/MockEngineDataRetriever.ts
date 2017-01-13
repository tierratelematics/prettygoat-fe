import {IEngineDataRetriever} from "../../scripts/configs/IEngineDataRetriever";
import IEngineData from "../../scripts/configs/IEngineData";

export class MockEngineDataRetriever implements IEngineDataRetriever{

    engineData(): IEngineData {
        return null;
    }
}