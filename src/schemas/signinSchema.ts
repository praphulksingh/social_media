import {z} from "zod";

export const signinSchema=z.object({
    identifier:z.string().min(8),
    password:z.string()


})