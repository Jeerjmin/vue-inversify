import { Expose } from 'class-transformer';

export default class AuthModel {
    @Expose()
    token!: string | null;
}
