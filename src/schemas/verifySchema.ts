import {z} from "zod";

export const verifySchema=z.object({
    code:z.string({required_error:"code is required"}).min(6,"code is of 6 characters required")


})