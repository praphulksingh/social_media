import NextAuth  from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";





 
export default NextAuth({
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
     async session({ session,token }) {
      return session
    },
    async jwt({ token, user}) {
      return token
    }
  },
  pages:{
    signIn:'/sign-in'
  },
  session:{
    strategy:"jwt"
  },
  secret:process.env.AUTH_SECRET,
})