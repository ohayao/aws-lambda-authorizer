import {Context} from "aws-lambda";
import 'source-map-support/register';
import {User,UserStatus} from "./src/user/user";
import {Auth} from "./src/auth/auth"

const auth=new Auth(process.env.JWT_KEY);

// 登录
export const login=async (event,context:Context,callback)=>{
    context.callbackWaitsForEmptyEventLoop=false;
    var name='defaultUser',password='defaultPassword';
    if(event.body){
        var data=JSON.parse(event.body);
        name=data.name||name;
        password=data.password||password;
    }
    let user=User.Login(name,password);
    user.Add();
    let token=auth.sign({name:name,password:password},60*60*24*30);
    callback(null,{
        statusCode:200,
        body:token
    });
}
// 登出
export const logout=async(event,context:Context,callback)=>{
    context.callbackWaitsForEmptyEventLoop=false;
    await auth.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMDQwY2JiMjM3ZWU1YzM3ZWU2OTUxZWE2NjA2MjZhZWQxYWUwMGZjNTRlMjdhNjg3ZGM5NTdiMTBjNWFhODQ5ZGQ1MzdkNDYxMDI2ZmY0MTk1NGY5NjA2MjliOWNiN2I2NzdmMjUwYTBhZDVhOTIyMWI5MTQ4NjhjOTMyZDZiYWEiLCJpYXQiOjE2MDQwMjc2NzEsImV4cCI6MTYwNjYxOTY3MX0.J4OGSpvmejhCds8nXL3XZQWDU5L2OzKUQ5YVFASsAlg',function(err,data){
        if(err){
            console.log('token 验证错误',err);
            return;
        }
        console.log('token 验证成功',`name=${data.data.name},password:${data.data.password}`);
    });
    let session_id='session_123456';
    User.Logout(session_id);
    callback(null,{statusCode:200,body:JSON.stringify({msg:'yes logout!'})});
}

// 主页
export const home=async(event,context:Context,callback)=>{
    context.callbackWaitsForEmptyEventLoop=false;
    if(!(event.requestContext&&event.requestContext.authorizer&&event.requestContext.authorizer.principalId)){
        return;
    }
    let data=event.requestContext.authorizer.principalId;
    User.ChangeStatus('1234',UserStatus.Active);
    var response={
        statusCode:200,
        body:JSON.stringify({
            msg:`Welcome [${data.data.name}], your token (jsonwebtoken jwt) verify pass! your password is [${data.data.password}], expireDate is [${data.exp}]`
        })
    }
    callback(null,response);
}