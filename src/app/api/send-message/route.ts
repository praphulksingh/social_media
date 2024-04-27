import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { Message } from "@/models/userModel";

export async function POST (request:Request){
    const {username,content}=await request.json()
    try {
        const user=await UserModel.findOne({username})
        if (!user) {
            return Response.json({
                success:false,
                message:"User not found"
            },
        {status:404})
        }

        //is user accepting the messages
        if (!user.isAcceptingMessage){
            return Response.json({
                success:false,
                message:"User not accpeting messages"
            },
        {status:401})
        }

        const newMessage={content, createdAt:new Date()}
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json({
                success:true,
                message:"Message sent successfully"
            },
        {status:201})
    } catch (error) {
        console.log("error at sending messages",error)
        return Response.json({
                success:false,
                message:"error at sending messages"
            },
        {status:401})
    }
}
