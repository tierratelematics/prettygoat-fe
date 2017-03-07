import {ICommandDispatcher, CommandResponse} from "ninjagoat-commands";
import {Dictionary} from "ninjagoat";

class MockCommandDispatcher implements ICommandDispatcher {
    dispatch(command: Object, metadata?: Dictionary<any>): Promise<CommandResponse> {
        return null;
    }
}

export default MockCommandDispatcher;