export interface IAuth{
    private_key:string;
    verify(token:string,callback:any):void;
    sign(obj:any,expireSecond:number):string;
}