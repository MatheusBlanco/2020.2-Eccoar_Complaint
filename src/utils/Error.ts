export class GeneralError {
	message: string;

	constructor(message: string) {
		this.message = message;
	}

	getCode(): number {
		if (this instanceof BadRequest) {
			return 400;
		} else if (this instanceof NotFound) {
			return 404;
		}
		return 500;
	}
}

export class BadRequest extends GeneralError {}
export class NotFound extends GeneralError {}
