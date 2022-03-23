import { Category } from '../category';

interface ExtractConstructorParams {
    id: string;
    amount: number;
    timeStamp: number;
    category: Category;
    description: string;
    type: 'debit' | 'credit'
}
export class Extract {
    public id?: string;
    public amount: number;
    public timeStamp: number;
    public category: Category;
    public description: string;
    public type: string;

    constructor(args: Partial<ExtractConstructorParams>) {
        if(args.id) this.id = args.id;
        if(args.amount) this.amount = args.amount;
        if(args.timeStamp) this.timeStamp = args.timeStamp;
        if(args.category) this.category = args.category;
        if(args.type) this.type = args.type;
        if(args.description) this.description = args.description;
    }

}