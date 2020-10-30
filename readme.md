## AWS Lambda Authorizer示例

> 原始数据采用了aes192加密解密

### 参考官网 authorizer 介绍
https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html

### 参考示例
https://github.com/yuanfux/aws-lambda-user

### 测试方法 本地运行
0. sls offline

1. 登录获取token
curl 'http://localhost:3000/auth-user/login?a=123&b=456' -X POST --data '{"name":"zhangsan","password":"3289*&(#&(5NNjsd"}' -H 'Content-type:application/json'

2. 打开首页验证authorizer
curl 'http://localhost:3000/auth-user/home' -X GET -H "Authorization:Bearer ..."  --data '{"text":""}'

