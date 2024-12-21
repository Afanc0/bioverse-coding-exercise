"use client"

import React from "react"
import { useRouter } from 'next/navigation';
import userLoginData from "@bioverse-intake/data/users.json"

type LoginData = {
    password: string;
    privileges: number;
  };
  
type UserLoginData = {
    [username: string]: LoginData;
};

const LoginPanel = () => {

    const userLoginRef = React.useRef<HTMLInputElement>(null)
    const userPasswordRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = React.useState(false);

    const router = useRouter()

    const navigateToDashboard = () => router.push('/dashboard');

    const handleSubmitForm = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const loginValue = userLoginRef.current?.value ?? ''
        const passwordValue = userPasswordRef.current?.value ?? ''
        
        const data: UserLoginData = userLoginData;
        if (loginValue in data) {
            const userData = data[loginValue]
            if (userData.password === passwordValue) {
              console.log("Login successful")
              navigateToDashboard()
            } else {
              console.log("Incorrect password")
            }
        } else {
            console.log("User not found")
        }
    }

    return (
        <div className="bg-white shadow-lg px-8 py-10 flex flex-col gap-6 min-w-[375px] rounded-xl">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-bold">Sign in</h1>
                <p className="text-base">Let’s learn about you to tailor your needs</p>
            </div>
            <div>
                <form onSubmit={handleSubmitForm}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-6">
                            <input 
                                className="border-2 border-gray-400 p-[10px] text-lg rounded-md flex-1 focus:border-[#3b8fd6]"
                                type="text"
                                placeholder="Email or Phone"
                                ref={userLoginRef}
                            />
                            <div className="relative flex">
                                <input
                                    className="border-2 border-gray-400 p-[10px] pr-[70px] text-lg rounded-md flex-1 focus:border-[#3b8fd6]"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    ref={userPasswordRef}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    <span className="text-[#286ba2] text-base font-semibold">{showPassword ? "hide" : "show"}</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <span onClick={() => alert("User: testuser@gobioverse.com, Password: password")} className="text-[#286ba2] font-bold text-base cursor-pointer">
                                Forgot Password?
                            </span>
                        </div>
                        <div className="flex justify-center items-center">
                            <button type="submit" className="bg-[#286ba2] flex-1 rounded-full py-4 hover:bg-[#3b8fd6]">
                                <span className="text-white text-base font-semibold">Sign in</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default LoginPanel