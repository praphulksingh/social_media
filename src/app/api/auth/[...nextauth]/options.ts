import {NextAuthOptions}  from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";



/*this file will take care of signup and generate tokens as well as generate page of signup */

 
export const authOption:NextAuthOptions ={
  providers: [
    Credentials({
        id: "credentials",
        name: "Credentials",
        credentials: {
            email: { label: "email", type: "text", placeholder: "email address" },
            password: { label: "Password", type: "password" }
    },
    async authorize(credentials:any):Promise<any>{
        await dbConnect();
       try {
        //find user
        const user=await UserModel.findOne({
            $or:[
                {email:credentials.identifier},
                {username:credentials.identifier}
            ]
        })
        if (!user) {
            throw new Error("No user find with email or username")
        }
        if (!user.isVerified) {
            throw new Error("Please verify your account before login")
        }

        //compare password
        const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password)
        if (isPasswordCorrect) {
            return user
        }else{
            throw new Error("Invalid password")
        }

       } catch (error:any) {
        throw new Error(error)
       }
    }
    })
  ],
  callbacks:{
    
    async jwt({ token, user}) {
      //injecting user data in token
      if(user){
        token._id=user._id?.toString()
        token.username=user.username
        token.isVerified=user.isVerified
        token.isAcceptingMessage=user.isAcceptingMessage
       
      }
      return token
    },
     async session({ session,token }) {
       //injecting token data in session
       if(token){
        session.user._id=token._id
        session.user.username=token.username
        session.user.isVerified=token.isVerified
        session.user.isAcceptingMessage=token.isAcceptingMessage
       }
      return session
    }
  },
  pages:{
    signIn:'/sign-in'
  },
  session:{
    strategy:"jwt"
  },
  secret:process.env.AUTH_SECRET,
}