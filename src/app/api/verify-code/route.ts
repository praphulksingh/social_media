import {z} from 'zod';
import UserModel from '@/models/userModel';
import dbConnect from '@/lib/dbConnect';
import {usernameValidation} from '@/schemas/signupSchema';


export async function POST(request:Request){
    await dbConnect();

    try {
        const {username, code}=await request.json()

        const decodedUsername=decodeURIComponent(username)

        const user=await UserModel.findOne({username:decodedUsername})
        if (!user ) {
            return Response.json({
        success:false,
        message:'user not found!'
       },{
        status:500
       })
        }

    const isCodeValid=user.verifyCode===code
    const isCodeNotExpired=new Date(user.verifyCodeExpiry) > new Date()

    if (isCodeValid && isCodeNotExpired) {
        user.isVerified=true
        await user.save()
        return Response.json({
        success:true,
        message:'account verified successfully!'
       },{
        status:200
       })
    }else if(!isCodeNotExpired){
        return Response.json({
        success:false,
        message:'time to verify code is eexpired!'
       },{
        status:400
       })
        
    }else {
        return Response.json({
        success:false,
        message:'code is not matched!'
       },{
        status:400
       })
        
    }
    

    } catch (error) {
        console.log("Error while verifing user",error) 
       return Response.json({
        success:false,
        message:'Error verifing user'
       },{
        status:500
       })
    }
}