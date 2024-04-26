import {z} from 'zod';
import UserModel from '@/models/userModel';
import dbConnect from '@/lib/dbConnect';
import {usernameValidation} from '@/schemas/signupSchema';

// query schema of username 
const UsernameQuerySchema = z.object({
    username: usernameValidation
});

export async function GET (request:Request){
await dbConnect();

    try {
        //getting data from url
        const {searchParams}=new URL(request.url)
        //extracting username from url
        const queryParams={
            username:searchParams.get('username')
        }
        //validate with zod
        const result=UsernameQuerySchema.safeParse(queryParams)
        console.log(result) // remove it after seeing 
        if(!result.success){
          const usernameErrors=result.error.format().username?._errors || []
          return Response.json({
            success:false,
            message:usernameErrors?.length>0?usernameErrors.join(',')
            :'Invalid query parameters'
          },{
            status:400
          })
        }
        const {username}=result.data;

        const existingVerifiedUser=await UserModel.findOne({
            username,
            isVerified:true
        })
        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:'Username already taken'
            },{
                status:400
            })
        }
        return Response.json({
                success:true,
                message:'Username  is unique'
            },{
                status:500
            })

    } catch (error) {
       console.log("Error while checking username",error) 
       return Response.json({
        success:false,
        message:'Error checking username'
       },{
        status:500
       })
    }
}