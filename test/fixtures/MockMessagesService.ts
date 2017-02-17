import {IMessagesService} from "ninjagoat-messages";

class MockMessagesService implements IMessagesService{

    success(message: string, title?: string, timeout?: number) {
    }

    failure(message: string, title?: string, timeout?: number) {
    }
}

export default MockMessagesService;