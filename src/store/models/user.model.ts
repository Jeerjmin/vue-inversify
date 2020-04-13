import { Expose, Transform } from 'class-transformer';

export default class UserModel {
    @Expose()
    @Transform((_, plain) => plain.fornova_user_id)
    id!: number;

    @Expose()
    firstName!: string;

    @Expose()
    lastName!: string;

    @Expose()
    email!: string;

    @Expose()
    token!: string;
}
