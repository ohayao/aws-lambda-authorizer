import {IUser} from "./IUser";
export enum UserStatus{
    Init,// 注册初始化
    Active,// 激活
    Freeze,// 冻结
    Delete,// 删除
};

export class User implements IUser{
    private id:string;
    public name:string;
    private password:string;
    public status:UserStatus;
    public nick:string;
    public avatar:string;
    public create_time:Date;

    public GetID():string{
        return this.id;
    }
    public SetID(id:string){
        this.id=id;
    }
    public GetPassword():String{
        return this.password;
    }
    public SetPassword(password:string):void{
        this.password=password;
    }
    constructor(username:string,password:string){
        this.name='999_'+username;
        this.password=password;
        this.create_time=new Date();
    }
    // TODO
    public static Login(name:string,password:string):User{
        console.log(`from Static.User.Login ${name}+${password}`);
        return new User(name,password);
    }
    // TODO
    public static Logout(session_id:string):boolean{
        return true;
    }
    // TODO
    public static ChangePassword(user_id:string,new_password:string):boolean{
        return true;
    }
    // TODO
    public static ChangeStatus(user_id:string,new_status:UserStatus):boolean{
        return true;
    }
    // TODO
    public static Delete(user_id:string):boolean{
        return true;
    }

    Add():boolean{
        console.log(`form Class.User.Add ${this.name}+${this.password}`);
        return false;
    }
    Delete():boolean{
        return false;
    }
    Modify():boolean{
        console.log('from Class.User.Modify '+this.name+' '+this.create_time);
        return false;
    }
    Query(user_id?:string):User{
        return null;
    }
}