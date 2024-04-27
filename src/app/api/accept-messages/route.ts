import { getServerSession } from "next-auth"
import { authOption } from "../auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import { User } from "next-auth"
import UserModel from "@/models/userModel"


export async function POST(request:Request){
    await dbConnect()

    const session=await getServerSession(authOption)
    const user:User=session?.user

    if (!session || !session.user) {
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{
            status:401
        })
    }

    const userId=user._id;
    const {acceptMessages}=await request.json()

    try {
        const updatedUser=await UserModel.findByIdAndUpdate(userId,{
            isAcceptingMessage:acceptMessages
        },{
            new:true
        })

        if (!updatedUser) {
            return Response.json({
            success:false,
            message:"Updated user not find!"
        },{
            status:401
        }) 
        }

         return Response.json({
            success:true,
            message:"Message acceptance status updated successfully!",
            updatedUser
        },{
            status:201
        }) 

    } catch (error) {
        console.log("Failed to upadte user status to accpet message")
        return Response.json({
            success:false,
            message:"Failed to upadte user status to accpet message"
        },{
            status:500
        })
    }
}

export async function GET(request:Request){
    await dbConnect()

    const session=await getServerSession(authOption)
    const user:User=session?.user

    if (!session || !session.user) {
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{
            status:401
        })
    }

    const userId=user._id;

    try {
        const finduser=await UserModel.findById(userId)
        if (!finduser) {
                return Response.json({
                success:false,
                message:"finduser not found!"
            },{
                status:401
            }) 
            }
            return Response.json({
                success:true,
                message:"user found!",
               isAcceptingMessage: finduser.isAcceptingMessage
            },{
                status:201
            }) 
    } catch (error) {
         console.log("Error in getting user acceptence message")
        return Response.json({
            success:false,
            message:"Error in getting user acceptence message"
        },{
            status:500
        })
    }

}