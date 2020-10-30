import {User,UserStatus} from "./user";
export interface IUser{
    // 添加用户
    Add():boolean;
    // 删除用户
    Delete():boolean;
    // 修改用户
    Modify():boolean;
    // 查询用户
    Query(user_id?:string):User;
};