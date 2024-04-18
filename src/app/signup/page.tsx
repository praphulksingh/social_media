
 "use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// import toast from "react-hot-toast"; 

export default function SignupPage(){
    const router = useRouter();
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:"",
        fullName:""
    })

    const [loading,setLoading]=useState(false);
    const [disabledButton,setButtonDisabled]=useState(false);

    const onSignup=async ()=>{
        try {
            setLoading(true);
            const response=await axios.post("/api/users/signup",user);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed",error.message);
        }
    }

    useEffect(()=>{
        if (user.username.length>0 && user.email.length>0 && user.password.length>0 ) {
            setButtonDisabled(false);
        }else{setButtonDisabled(true)}
    },[user])
    return(
          <div>
        <section className="bg-gray-50  dark:bg-gray-900">
  <div className=" w-auto flex flex-col items-center justify-center pr-8 p-8 mx-auto md:h-screen  ">
     
      <div className="w-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        
          <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-5xl font-extrabold font-mono">Instagram</h1>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                  {loading?"Signing up ...":"Signup"}
              </h1>
             <hr/>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                      <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      value={user.email}
                      onChange={(e)=>{setUser({...user,email: e.target.value})}}  
                      placeholder="email address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                  </div>
                  <div>
                      <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                      <input 
                      type="text" 
                      name="fullName" 
                      id="fullName"
                      value={user.fullName}
                      onChange={(e)=>{setUser({...user,fullName: e.target.value})}} 
                      placeholder="Full Name" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                      <input 
                      type="text" 
                      name="username" 
                      id="username"
                      value={user.username}
                      onChange={(e)=>{setUser({...user,username: e.target.value})}} 
                      placeholder="Username" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                      <input type="password"
                       name="password" 
                       id="password"
                       value={user.password}
                       onChange={(e)=>{setUser({...user,password: e.target.value})}}
                       placeholder="Password" 
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  
                  <button 
                  onClick={onSignup} 
                  type="submit" 
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{disabledButton?"No Signup":"Signup"}</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? 
                      <Link href="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Login here</Link>
                  </p>
              
          </div>
      </div>
  </div>
</section>
    </div>

    )
}