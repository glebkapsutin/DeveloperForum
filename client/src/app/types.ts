// src/app/services/styles.ts

/**
 * Типы и DTO, соответствующие моделям бэкенда.
 */

/** Возможные типы ролей пользователя (на основе server.Core.Enums) */
export type RoleType = "Admin" | "User";

/** Модель роли */
export type Role = {
    id: number;
    typeOfRole: RoleType;
};

/** Модель пользователя */
export type User = {
    id: number;
    userName: string;      // соответствует UserName на бэкенде
    email: string;
    password: string;      // пароль обычно не отправляют на клиент, но он здесь для полноты модели
    registeredAt: string;  // дата в формате ISO
    posts?: Post[];        // список постов, может быть пустым
    role: Role;
    roleId: number;
};

/** Модель поста */
export type Post = {
    id: number;
    title: string;
    description: string;
    author: string;
    createdDate?: string;  // дата может быть отсутствующей (null)
    comments?: Comment[];  // список комментариев
    user?: User;           // автор поста
    userId: number;
};

/** Модель комментария */
export type Comment = {
    id: number;
    post: Post;
    postId: number;
    description: string;
    author: string;
    createdDate: string;  // дата в формате ISO
};

/** Модель категории */
export type Category = {
    id: number;
    title: string;
    description: string;
    posts?: Post[];        // список постов, связанных с категорией
};

/** Настройки JWT */
export type JwtSettings = {
    secret: string;
    issuer: string;
    audience: string;
    expireMinutes: number;
};

/* DTO */

/** Запрос на регистрацию */
export type RegistrationRequest = {
    username: string;  // соответствует Username на бэкенде
    email: string;
    password: string;
};

/** Запрос на логин */
export type LoginRequest = {
    email: string;
    password: string;
};

/** DTO пользователя (без пароля) */
export type UserDto = {
    id: number;
    userName: string;
    email: string;
    registeredAt: string;
    role: Role;
};

/** Результат аутентификации */
export type AuthResult = {
    success: boolean;
    message: string;
    token: string;    // JWT-токен, если операция успешна
    user: UserDto;
};
