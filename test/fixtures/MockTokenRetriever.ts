import {ITokenRetriever} from "../../scripts/configs/ITokenRetriever";

class MockTokenRetriever implements ITokenRetriever {

    token(): string {
        return null;
    }
}

export default MockTokenRetriever;