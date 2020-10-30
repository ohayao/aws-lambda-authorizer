import {Context} from "aws-lambda";
import 'source-map-support/register';
import { Auth } from "./src/auth/auth";

const authorize=new Auth(process.env.JWT_KEY);

export const auth=async(event:any,context:Context,callback:any)=>{
    context.callbackWaitsForEmptyEventLoop=false;
    if (event.authorizationToken && event.authorizationToken.split(' ').length === 2 && event.authorizationToken.split(' ')[0] === 'Bearer'){
        const token = event.authorizationToken.split(' ')[1];
        authorize.verify(token, function(err:any,data:any){
            if(err){
                return callback(`TokenError:${err}`);
            }
            var response=generatePolicy(data,'Allow',event.methodArn)
            return callback(null,response);
        });
    } else {
        return callback('Unauthorized');
    }
}
function generatePolicy(principalId:any, effect:any, resource:any){
    if(!(effect&&resource)) return {principalId};
    return {
        principalId,
        policyDocument:{
            Version:`${new Date().getTime()/1000}`,
            Statement:[{
                Action:'execute-api:Invoke',
                Effect:effect,
                Resource:resource
            }]
        }
    }
};