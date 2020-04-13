import { injectable } from 'inversify-props';

export const TokenSessionStorageServiceS = Symbol.for('TokenSessionStorageServiceS');
@injectable(TokenSessionStorageServiceS as unknown as string)
export default class TokenSessionStorageService {
    get token(): string | null {
        return sessionStorage.getItem('token');
    }

    setToken(token: string | null) {
        if (token) {
            sessionStorage.setItem('token', token);
        }
    }

    removeToken() {
        sessionStorage.removeItem('token');
    }
}
