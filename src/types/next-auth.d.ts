/*modifing user data types soo that we can store user data in token in options.ts(jwt) */



import 'next-auth'

declare module 'next-auth'{
    interface User{
        _id?:string;
        isVerified?:boolean;
        isAcceptingMessage?:boolean,
        username?:string
    }
    interface Session{
       user:{
         _id?:string;
        isVerified?:boolean;
        isAcceptingMessage?:boolean,
        username?:string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
       _id?:string;
        isVerified?:boolean;
        isAcceptingMessage?:boolean,
        username?:string 
    } 
}