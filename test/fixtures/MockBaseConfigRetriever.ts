import {IBaseConfigRetriever} from "../../scripts/configs/IBaseConfigRetriever";
import IBaseConfig from "../../scripts/configs/IBaseConfig";

class MockBaseConfigRetriever implements IBaseConfigRetriever {

    baseConfig(): IBaseConfig {
        return null;
    }
}

export default MockBaseConfigRetriever;