export interface UserDTO {
    id?: string;
    name: string;
    email: string;
    role: 'STUDENT'| 'INSTRUCTOR' | 'ADMIN'
    hashedPassword: string;
}

