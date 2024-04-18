//Document is used when we use typeSaftey or typeScript
import mongoose,{Schema, Document} from 'mongoose';

//custom interface which define datatypes 
export interface Message extends Document{
    content: string,
    createdAt: Date
};

// "Schema<Message>" giving type to schema
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default:Date.now
    }
},
)

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage:boolean,
    messages: Message[]
    
};

const userSchema:Schema<User>= new Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
        trim:true,
        unique: true
    },
    email: {
        type: String,
        required: [true,"email is required"],
        unique: true,
        match:[/.+\@.+\..+/,"Please fill a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true,"password is required"],
    },
    verifyCode: {
        type: String,
        required: [true,"verifyCode is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true,"verifyCodeExpiry is required"],
    },
    isVerified: {
        type: Boolean,
        default:false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema],

})

const UserModel=(mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",userSchema))

export default UserModel