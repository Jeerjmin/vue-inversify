import { injectable } from 'inversify-props';

export const NotifyServiceS = Symbol.for('NotifyServiceS');
@injectable(NotifyServiceS as unknown as string)
export default class NotifyService {
    private errorNotification = () => {};
    private warningNotification = () => {};
    private successNotification = () => {};
    private infoNotification = () => {};

    init({
        errorNotification, warningNotification, successNotification, infoNotification,
    }: { errorNotification: () => void, warningNotification: () => void, successNotification: () => void, infoNotification: () => void, }) {
        this.errorNotification = errorNotification;
        this.warningNotification = warningNotification;
        this.successNotification = successNotification;
        this.infoNotification = infoNotification;
    }

    error() {
        this.errorNotification();
    }

    warning() {
        this.warningNotification();
    }

    success() {
        this.successNotification();
    }

    info() {
        this.infoNotification();
    }
}
