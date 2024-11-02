import { User } from "./user.model";

export interface Offer {
    id: number;
    type: string;
    email: string;
    enterprise: string;
    skills: string[];
    tasks: string[];
    user: User
  }