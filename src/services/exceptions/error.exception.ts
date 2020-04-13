export default class ErrorException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ErrorException';
    }
}
