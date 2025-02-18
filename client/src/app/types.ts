export interface Post {
    id: number;
    title: string;
    description: string;
    author: string;
    createdDate?: string;
    comments?: Comment[];
    user?: User;
    userId: number;
}

export interface Role {
    id: number;
    typeOfRole: RoleType;
}

export interface User {
    id: number;
    userName: string;
    email: string;
    password: string;
    registeredAt: string;
    posts?: Post[];
    role: Role;
    roleId: number;
}

export interface JwtSettings {
    secret: string;
    issuer: string;
    audience: string;
    expireMinutes: number;
}

export interface Comment {
    id: number;
    post: Post;
    postId: number;
    description: string;
    author: string;
    createdDate: string;
}

export interface Category {
    id: number;
    title: string;
    description: string;
    posts?: Post[];
}

// Перечисление ролей
export enum RoleType {
    Admin = "Admin",
    User = "User"
}
