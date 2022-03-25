import { Extract } from '../extract';
import { Category, categories } from '../category';

interface UserConstructorParams {
    id: string;
    email: string;
    cpf: string;
    name: string;
    password: string;
    extracts: Extract[];
    categories: Category[];
}

export class User {
    public id: string;
    private email: string;
    private cpf: string;
    private name: string;
    private password: string;
    public extracts: Extract[];
    public categories: Category[];
    
    constructor(args: Partial<UserConstructorParams>) {
        if(args.id) this.id = args.id;
        this.validateEmail(args.email);
        this.email = args.email!;
        this.validateCPF(args.cpf);
        this.cpf = args.cpf!;
        this.name = args.name || "";
        this.validatePassword(args.password);
        this.password = args.password!;
        this.categories = args.categories || this.createCategories();
        this.extracts = args.extracts || [];
    }

    private validateEmail(email: string | undefined) {
        if(email === 'zoado' || !email) throw new Error();
        return true;
    }

    private validateCPF(cpf: string | undefined) {
        if(cpf === 'zoado' || !cpf) throw new Error();
        return true;
    }
    
    private validatePassword(password: string | undefined) {
        if(!password) {
            throw new Error("Please provide a password");
        } else if (password.length < 8) {
            throw new Error("Please provide a password longer than 8 characters");
        }
    }

    getEmail() {
        return this.email;
    }

    getCPF() {
        return this.cpf;
    }

    getName() {
        return this.name;
    }

    getPassword() {
        return this.password;
    }

    createCategories() {
        return categories.map(category => (
            new Category({
                name: category
            })
        ));
    }
}
