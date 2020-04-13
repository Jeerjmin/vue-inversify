import 'reflect-metadata';
import NotifyService from '@/services/notify.service';

describe('notify.service.ts', () => {
    it('NotifyService.init', () => {
        const notifyService = new NotifyService();

        const warningNotification = jest.fn();
        const successNotification = jest.fn();
        const infoNotification = jest.fn();
        const errorNotification = jest.fn();

        notifyService.init({
            warningNotification,
            successNotification,
            infoNotification,
            errorNotification,
        });

        notifyService.warning();
        expect(warningNotification).toBeCalled();
        notifyService.success();
        expect(successNotification).toBeCalled();
        notifyService.info();
        expect(infoNotification).toBeCalled();
        notifyService.error();
        expect(errorNotification).toBeCalled();
    });
});
