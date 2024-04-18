import {resend} from "@/lib/resendEmail";
import VerificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
    ):Promise<ApiResponse>{

    try {
    await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Mystery Message | Verification code',
    react:VerificationEmail({username,otp:verifyCode}),
    });
    return{success:true,message:"verification email send successfully"}
    } catch (emailError) {
        console.log("Error sending verification email",emailError)
        return{success:false,message:"failed to send verification email"}
    }
}