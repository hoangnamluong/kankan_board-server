
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateBoardInput {
    name: string;
    ownerId: number;
}

export class CreateTaskInput {
    columns_id: number;
    description: string;
    position: number;
    title: string;
}

export class CreateUsersInput {
    email: string;
    name?: Nullable<string>;
    password: string;
}

export class LoginAuthInput {
    password: string;
    username: string;
}

export class SignupAuthInput {
    email: string;
    name?: Nullable<string>;
    password: string;
}

export class UpdateBoardInput {
    name?: Nullable<string>;
    ownerId?: Nullable<number>;
}

export class UpdateTaskInput {
    columns_id?: Nullable<number>;
    description?: Nullable<string>;
    position?: Nullable<number>;
    title?: Nullable<string>;
}

export class UpdateUsersInput {
    email?: Nullable<string>;
    name?: Nullable<string>;
    password?: Nullable<string>;
}

export class Board {
    columns?: Nullable<Columns[]>;
    createdAt?: Nullable<DateTime>;
    id: number;
    isDelete: boolean;
    name?: Nullable<string>;
    owner?: Nullable<Users>;
}

export class Columns {
    board?: Nullable<Board>;
    id: number;
    isDelete: boolean;
    name?: Nullable<string>;
    position: number;
    tasks?: Nullable<Task[]>;
}

export class LoginResponse {
    accessToken: string;
    email?: Nullable<string>;
    id?: Nullable<number>;
    name?: Nullable<string>;
}

export abstract class IMutation {
    abstract createBoard(createBoardInput: CreateBoardInput): Board | Promise<Board>;

    abstract createColumn(createTaskInput: CreateTaskInput): Task | Promise<Task>;

    abstract createUser(createUsersInput: CreateUsersInput): Users | Promise<Users>;

    abstract deleteBoard(id: number): Board | Promise<Board>;

    abstract deleteColumn(id: number): Task | Promise<Task>;

    abstract deleteUser(id: number): Users | Promise<Users>;

    abstract login(loginAuthInput: LoginAuthInput): LoginResponse | Promise<LoginResponse>;

    abstract signup(signupAuthInput: SignupAuthInput): SignupResponse | Promise<SignupResponse>;

    abstract updateBoard(id: number, updateBoardInput: UpdateBoardInput): Board | Promise<Board>;

    abstract updateColumn(id: number, updateTaskInput: UpdateTaskInput): Task | Promise<Task>;

    abstract updateUser(id: number, updateUsersInput: UpdateUsersInput): Users | Promise<Users>;
}

export abstract class IQuery {
    abstract board(id: number): Board | Promise<Board>;

    abstract boards(): Board[] | Promise<Board[]>;

    abstract column(id: number): Columns | Promise<Columns>;

    abstract columns(): Columns[] | Promise<Columns[]>;

    abstract task(id: number): Task | Promise<Task>;

    abstract tasks(): Task[] | Promise<Task[]>;

    abstract user(email: string): Users | Promise<Users>;

    abstract users(): Users[] | Promise<Users[]>;
}

export class SignupResponse {
    accessToken: string;
    email?: Nullable<string>;
    id?: Nullable<number>;
    name?: Nullable<string>;
}

export class Task {
    column?: Nullable<Columns>;
    description?: Nullable<string>;
    id: number;
    isDeleted: boolean;
    position?: Nullable<number>;
    title?: Nullable<string>;
}

export class Users {
    boards?: Nullable<Board[]>;
    email: string;
    id: number;
    isActive: boolean;
    name?: Nullable<string>;
    password: string;
}

export type DateTime = any;
type Nullable<T> = T | null;
