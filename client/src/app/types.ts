
/**
 * ���� � DTO, ��������������� ������� �������.
 */

import { Avatar } from "@mui/material";


export type RoleType = "Admin" | "User";


export type Role = {
    id: number;
    typeOfRole: RoleType;
};
export type Likes = {
    id: number;
    user: User;
    userId: number;
    post: Post;
    postId: number;
}
export type Follows = {
    id: number;
    follower:User;
    following: User;
    followerId: number;
    followingId: number;
}


export type User = {
    id: number;
    userName: string;      
    email: string;
    password: string;      
    registeredAt: string;  
    posts?: Post[];        
    role: Role;
    avatar: string;
    roleId: number;
    followers: Follows[];
    followings: Follows[];

};


export type Post = {
    id: number;
    title: string;
    description: string;
    author: string;
    createdDate?: string;  
    comments?: Comment[];  
    user?: User;           
    userId: number;
    likes: Likes[];
};


export type Comment = {
    id: number;
    post: Post;
    postId: number;
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




export type RegistrationRequest = {
    username: string;  
    email: string;
    password: string;
};


export type LoginRequest = {
    email: string;
    password: string;
};


export type UserDto = {
    id: number;
    userName: string;
    email: string;
    registeredAt: string;
    role: Role;
    avatar: string;
};


export type AuthResult = {
    success: boolean;
    message: string;
    token: string;    
    user: UserDto;
};
