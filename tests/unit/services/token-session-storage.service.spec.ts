import 'reflect-metadata';
import TokenSessionStorageService from '@/services/token-session-storage.service';


describe('tokenSessionStorageService.service.ts', () => {
    it('TokenSessionStorageService.token', async () => {
        const tokenSessionStorageServiceService = new TokenSessionStorageService();

        expect(tokenSessionStorageServiceService.token).toEqual(sessionStorage.getItem('token'));
    });

    it('TokenSessionStorageService.setToken', async () => {
        const tokenSessionStorageServiceService = new TokenSessionStorageService();

        tokenSessionStorageServiceService.setToken('testToken');

        expect(sessionStorage.getItem('token')).toEqual('testToken');
    });

    it('TokenSessionStorageService.removeToken', async () => {
        const tokenSessionStorageServiceService = new TokenSessionStorageService();

        tokenSessionStorageServiceService.removeToken();

        expect(sessionStorage.getItem('token')).toEqual(null);
    });
});
