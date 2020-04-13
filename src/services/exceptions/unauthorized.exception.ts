import ErrorException from './error.exception';

export default class UnauthorizedException extends ErrorException {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedException';
    }
}
