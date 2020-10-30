import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'aws-lambda-authorizer',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'auth-user',
    region: 'cn-north-1',
    endpointType: 'regional',
    memorySize: 256,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      JWT_KEY: 'jsonwebtoken_123456',
    },
    httpApi:{
      authorizers:{
        "someauth":{
          identitySource:'auth.auth',
          issuerUrl:'',
          audience:[]
        }
      }
    }
  },
  functions: {
    login: {
      handler: 'user.login',
      timeout:10,
      events: [
        {
          http: {
            method: 'post',
            path: 'login',
          }
        }
      ]
    },
    logout: {
      handler: 'user.logout',
      events:[{
        http:{
          method: 'get',
          path: 'logout'
        }
      }]
    },
    home:{
      handler:'user.home',
      events:[{
        http:{
          method:'get',
          path:'home',
          authorizer:{
            name:'authorize',
          }
        }
      }]
    },
    authorize:{
      handler: 'auth.auth',
      events:[{
        http:{
          method:'get',
          path:'auth'
        }
      }]
    },
  }
}

module.exports = serverlessConfiguration;
