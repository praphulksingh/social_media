/*ZOD is a library used to validate schema */

import {z} from "zod";

export const usernameValidation=z
    .string()
    .min(1,  "Username is required")
    .max(32, "Username is too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores")

    export const signUpSchema=z.object({
        username:usernameValidation,
        email:z.string().email({message:"Email is invalid"}),
        password:z.string()
        .min(8, {message:"Password must be at least 8 characters long"})

    })