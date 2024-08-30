export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    // Add other roles as necessary
  }

export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    birthDate: Date;
    phoneNumber: number;
    role: string;
}