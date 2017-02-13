import {IBaseConfigRetriever} from "../../scripts/configs/IBaseConfigRetriever";
import {IBaseConfig} from "ninjagoat";

class MockBaseConfigRetriever implements IBaseConfigRetriever {

    baseConfig(): IBaseConfig {
        return null;
    }
}

export default MockBaseConfigRetriever;