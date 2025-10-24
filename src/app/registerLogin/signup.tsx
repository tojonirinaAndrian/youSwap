'use client';
import { useGlobalStore } from "@/store/use-global-store";
import { useState } from "react";

export default function SignUpPage() {
    const { setWhereIsLoginRegisterPage } = useGlobalStore();
    const [seenPassword, setSeenPassword] = useState<boolean>(false);
    const [seenConfirmedPassword, setSeenConfirmedPassword] = useState<boolean>(false);
    const onLoginClick = () => {
        setWhereIsLoginRegisterPage('login');
    }
    const onSignupClick = () => {
        setWhereIsLoginRegisterPage('infos');
    }
    return (
        <>
        <div className="space-y-8 w-full">
            <div className='space-y-2 md:max-w-[70%] text-center mx-auto'>
               <h2>Share with others and learn from them.</h2>
               <p className="text-black/70">We can find your perfect match to fit with what you are especially looking for.</p>
            </div>
            <div className="w-full flex flex-col gap-3 items-center">
                    <p className="text-black/70">Sign up with</p>
                    <div className="flex gap-3">
                        <button className="borderedButton">Google</button>
                        <button className="borderedButton">Facebook</button>
                        <button className="borderedButton">Github</button>
                    </div>
                    <p className="text-black/70">Or continue by completing</p>
                </div>
            <div className="space-y-8 w-full">
                <div className="space-y-1">
                    <label htmlFor="firstName" className="block">First name: *</label>
                    <input type="text" name="firstName" id="firstName" 
                    placeholder="First name" required
                    className="border focus:border-black w-full rounded-md p-3"/>
                </div>
                <div className="space-y-1">
                    <label htmlFor="secondName" className="block">Second name: *</label>
                    <input type="text" name="secondName" id="secondName" 
                    placeholder="Second name" required
                    className="border focus:border-black w-full rounded-md p-3"/>
                </div>
                <div className="space-y-1">
                    <label htmlFor="email" className="block">Email: *</label>
                    <input type="email" name="email" id="email" 
                    placeholder="Email" required
                    className="border focus:border-black w-full rounded-md p-3"/>
                </div>
                <div className="space-y-1">
                    <label htmlFor="password" className="block">Password: *</label>
                    <div className="flex gap-3">
                        <input name="password" id="password" 
                        type={seenPassword ? "text" : "password"}
                        placeholder="Password" required
                        className="border focus:border-black w-full rounded-md p-3"/>
                        <p className="text-sm my-auto cursor-pointer"
                        onClick={() => setSeenPassword(!seenPassword)}
                        >{seenPassword ? "Hide" : "See"}</p>
                    </div>
                </div>
                <div className="space-y-1">
                    <label htmlFor="confirmPassword" className="block">Confirm your password : *</label>
                    <div className="flex gap-3">
                        <input name="confirmPassword" id="confirmPassword"
                        type={seenConfirmedPassword ? "text" : "password"}
                        placeholder="Repeat your password" required
                        className="border focus:border-black w-full rounded-md p-3"/>
                        <p className="text-sm my-auto cursor-pointer"
                        onClick={() => setSeenConfirmedPassword(!seenConfirmedPassword)}
                        >{seenConfirmedPassword ? "Hide" : "See"}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-1 text-sm text-black/70">
                        <input type="checkbox" name="rememberMe" id="rememberId"/>
                        <p className="my-auto">Remember me</p>
                    </div>
                </div>
            </div>
            <p>You already have an account ? Click <span
            className="underline text-blueDianne cursor-pointer"
            onClick={onLoginClick}
            >
                Here
            </span></p>
            <button type="button" className="filledButton !w-full"
            onClick={onSignupClick}
            >Sign Up</button>
        </div>
    </>
    )
}