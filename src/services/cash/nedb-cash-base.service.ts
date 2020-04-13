import { injectable } from 'inversify-props';
import DataStore from 'nedb';
import Month from '@/types/month.type';
import Year from '@/types/year.type';

export interface RatesCashQuery {
    provider: string,
    month: Month,
    year: Year,
    los: string
}

type Query = RatesCashQuery | {};
type Data = {}
type Document = {  }

export const NedbCashBaseServiceS = Symbol.for('NedbCashBaseServiceS');
@injectable(NedbCashBaseServiceS as unknown as string)
export default class NedbCashBaseService {
    constructor() {
        this.db = new DataStore();
    }

    private db: DataStore;

    protected init(fileName: string) {
        this.db = new DataStore({ filename: fileName || 'data.json', autoload: true });
    }

    protected async insert(data: Data):Promise<Document> {
        return new Promise<Document>((resolve, reject) => {
            this.db.insert(data as any, (err: Error, newDoc: Document) => {
                if (err) {
                    reject(err);
                } else { resolve(newDoc); }
            });
        });
    }

    protected async update(query: Query, data: Data):Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.db.update(query, data, {}, (err: Error, number) => {
                if (err) {
                    reject(err);
                } else { resolve(number); }
            });
        });
    }

    protected async get(query: Query):Promise<Document> {
        return new Promise<Document>((resolve, reject) => {
            this.db.findOne(query, (err: Error, doc: Document) => {
                if (err) {
                    reject(err);
                } else { resolve(doc); }
            });
        });
    }

    protected async remove(query: Query):Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.db.remove(query, (err: Error, number) => {
                if (err) {
                    reject(err);
                } else { resolve(number); }
            });
        });
    }

    protected async restore():Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.db.remove({}, { multi: true }, (err: Error, number) => {
                if (err) {
                    reject(err);
                } else { resolve(number); }
            });
        });
    }
}
