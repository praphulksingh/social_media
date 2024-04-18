import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request:Request){
    await dbConnect();

   try {
    const {email, username, password}=await request.json()
    const existingUserByUsername=await UserModel.findOne({
        username,
        isVerified:true
    })
    if(existingUserByUsername){
        return Response.json({
            success:false,
            message:"User already exists"
        },{
            status:400
        })
    }

    const existingUserByEmail=await UserModel.findOne({email})

        //generating verification code
    const verifyCode=Math.floor(100000+Math.random()*900000).toString()

    if(existingUserByEmail){
        if (existingUserByEmail.isVerified) {
            return Response.json({
            success:false,
            message:"email already exists"
        },{
            status:400
        })
        }else{
            const hashedPassword=await bcryptjs.hash(password, 10)
            existingUserByEmail.password=hashedPassword
            existingUserByEmail.verifyCode=verifyCode;
            existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
            await existingUserByEmail.save()
        }
        
    }
    else{/*if the user has fresh email */
        const hashedPassword=await bcryptjs.hash(password,10)
        /*in below code we are setting expiry time to 1 hour and because of new keyword we can use the variable */
        const expiryDate=new Date()
        expiryDate.setHours(expiryDate.getHours()+1)

        const newUser=new UserModel({
            username,
            email,
            password: hashedPassword,
            verifyCode: verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage:true,
            messages: []
        })
        await newUser.save()
    }

        /*sending email to user , */
        const emailResponse=await sendVerificationEmail(
            email,
            verifyCode,
            username
        )
        if (!emailResponse.success) {
            return Response.json({
            success:false,
            message:"sorry! email could not be sent"
        },{status:500})
        }

        return Response.json({
            success:true,
            message:"Email has been sent successfully"
        },{status:200})




        
    

   } catch (error) {
    console.error("Error while regestering user",error)
    return Response.json({
        success:false,
        message:"Error Regestring user"
    },{
        status:500
    })
   }
}

