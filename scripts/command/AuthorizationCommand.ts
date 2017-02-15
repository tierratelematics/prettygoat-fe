import {CommandDecorators as command} from "ninjagoat-commands";
import {Transport} from "ninjagoat-commands";
import {Event} from "ninjagoat-analytics";

@command.Type("AuthorizationCheck")
@command.Endpoint("/api/authorization/check")
@command.Transport(Transport.HTTP_Post)
@Event("authorization", "loginRequest", "login")
class AuthorizationCommand {
    token: string;

    constructor(token: string) {
        this.token = token;
    }
}

export default AuthorizationCommand
