// src/types.ts

export type User = {
    id: number;
    username: string;
    email: string;
    role: "Admin" | "User";
    registeredAt: string;
};
export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};

export type Role = {
    id: number;
    typeOfRole: "Admin" | "User";
};

export type Post = {
    id: number;
    title: string;
    description: string;
    author: string;
    createdDate?: string;
    userId: number;
    user?: User;
    comments?: Comment[];
};

export type Comment = {
    id: number;
    postId: number;
    post?: Post;
    description: string;
    author: string;
    createdDate: string;
};

export type Category = {
    id: number;
    title: string;
    description: string;
    posts?: Post[];
};

export type JwtSettings = {
    secret: string;
    issuer: string;
    audience: string;
    expireMinutes: number;
};
