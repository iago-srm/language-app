import { Extract } from "../extract";
import { User } from '../user';
import { ExtractNotFoundError } from '@common/errors';

interface CategoryConstructorParams {
    id: string;
    name: string;
    extracts: Extract[];
    total: number;
}

export class Category {
    public id?: string;
    public name: string;
    public extracts: Extract[];
    public total: number;
    public user: User

    constructor(args: Partial<CategoryConstructorParams>) {
        if(args.id) this.id = args.id;
        if(args.name) this.name = args.name;
        this.extracts = args.extracts || [];
        this.total = args.total || 0;
    }

    addNewExtract(extract: Extract) {
        // not very idempotent :(
        if(this.extracts.findIndex(e => e.id === extract.id) !== -1) {
            throw new Error("This extract already belongs to this category");
        }
        this.total += extract.amount;
        this.extracts.push(extract);
    }

    removeExtract(extract: Extract) {
        const oldExtractIndex = this.extracts.findIndex(e => e.id === extract.id);
        if(oldExtractIndex === -1) throw new ExtractNotFoundError();
        // this.extracts.splice(oldExtractIndex,1);
        this.total -= extract.amount;
    }
}

export * from './categories';