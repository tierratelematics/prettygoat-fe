import {Validator, ValidatorConstraint, ValidatorInterface} from "class-validator";
const validator = new Validator();

@ValidatorConstraint()
export class NotBlank implements ValidatorInterface {

    validate(text: string): boolean {
        return text && text.trim().length > 0;
    }
}