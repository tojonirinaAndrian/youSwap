'use client';
import { useGlobalStore } from "@/store/use-global-store";
import { useState } from "react";

export default function LoginPage() {
    const { setWhereIsLoginRegisterPage } = useGlobalStore()
    const [seenPassword, setSeenPassword] = useState<boolean>(false);
    const onSignupClick = () => {
        setWhereIsLoginRegisterPage('signUp');
    }
    return (
        <>
            <div className="space-y-8 w-full">
                <div className='space-y-2 md:max-w-[70%] text-center mx-auto'>
                    <h2>Happy to see you again.</h2>
                    <p className="text-black/70">Please enter your credentials.</p>
                </div>
                <div className="w-full flex flex-col gap-3 items-center">
                    <p className="text-black/70">Log in with</p>
                    <div className="flex gap-3">
                        <button className="borderedButton">Google</button>
                        <button className="borderedButton">Facebook</button>
                        <button className="borderedButton">Github</button>
                    </div>
                    <p className="text-black/70">Or continue by completing</p>
                </div>
                <div className="space-y-8 w-full">
                    <div className="space-y-1">
                        <label htmlFor="email" className="block">Email: *</label>
                        <input type="email" name="email" id="email" 
                        placeholder="Email" required
                        className="border focus:border-black w-full rounded-md p-3"/>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="block">Password: *</label>
                        <div className="flex gap-3">
                            <input  name="password" id="password"
                            type={seenPassword ? "text" : "password"}
                            placeholder="Password" required
                            className="border focus:border-black w-full rounded-md p-3"/>
                            <p className="text-sm my-auto cursor-pointer"
                            onClick={() => setSeenPassword(!seenPassword)}
                            >
                                {seenPassword ? "Hide" : "See"}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-1 text-sm text-black/70">
                            <input type="checkbox" name="rememberMe" id="rememberId"/>
                            <p className="my-auto">Remember me</p>
                        </div>
                        <p className="my-auto hover:underline cursor-pointer text-sm text-black/70">Forgot the password ?</p>
                    </div>
                </div>
                <p>You don't have an account yet ? Click <span
                className="underline text-blueDianne cursor-pointer"
                onClick={onSignupClick}
                >
                    Here
                </span></p>
                <button type="button" className="filledButton !w-full">Log in</button>                
            </div>
        </>
    )
}