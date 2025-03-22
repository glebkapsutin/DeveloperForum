/**
 *  DTO,  ������� �������.
 */

import { Avatar } from "@mui/material";


export type RoleType = "Admin" | "User";


export type Role = {
    Id: number;
    TypeOfRole: RoleType;
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
    bio?: string;
    location?: string;
    isFollowing?: boolean;

};


export type Post = {
    id: number;
    title: string;
    description: string;
    createdDate: string;  
    comments?: CommentDto[];  
    user?: User;           
    userId: number;
    likes?: Likes[];
    authorId: number;
    avatarUrl: string;
    name: string;
    likesCount: number;
    commentsCount: number;
    isLikedByUser: boolean;
};


export type Comment = {
    id: number;
    description: string;
    userId: number;
    user?: UserDto;
    createdDate: string;
    postId: number;
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
    username: string;
    email: string;
    role: Role;
    avatarUrl: string;
    bio?: string;
    location?: string;
    dataOfBirth?: Date;
    followers: Follows[];
    followings: Follows[];
    isFollowing?: boolean;
};


export type AuthResult = {
    success: boolean;
    message: string;
    token: string;    
    user: UserDto;
};

export type CommentDto = {
    id: number;
    description: string;
    userId: number;
    user?: UserDto;
    createdDate: Date;
    postId: number;
};
