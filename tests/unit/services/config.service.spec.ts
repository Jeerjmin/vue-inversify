import 'reflect-metadata';
import ConfigService from '@/services/config.service';


describe('config.service.ts', () => {
    it('ConfigService.apiUrl', async () => {
        const configService = new ConfigService();

        expect(configService.apiUrl).toEqual(String(process.env.VUE_APP_API_URL));
    });
});
