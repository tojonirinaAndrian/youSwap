'use client';
import { useGlobalStore } from "@/store/use-global-store";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SignupPage() {
    const { setWhereIsLoginRegisterPage, setNewToast, signupContentState, setSignupContentState, setConfirmedPasswordOnSignup } = useGlobalStore();
    const [seenPassword, setSeenPassword] = useState<boolean>(false);
    const [firstPassword, setFirstPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [emailState, setEmailState] = useState<string>(signupContentState.email);
    const [fullnameState, setFullnameState] = useState<string>(signupContentState.fullName);
    const [pseudo, setPseudo] = useState<string>(signupContentState.pseudo);
    const [seenConfirmedPassword, setSeenConfirmedPassword] = useState<boolean>(false);
    const [passwordCharNumbers, setPasswordCharNumbers] = useState<number>(0);
    const [samePasswords, setSamePasswords] = useState<boolean>(false);
    const [startedTyping,setStartedTyping] = useState<boolean>(false);
    const [startedTypingConfirmation,setStartedTypingConfirmation] = useState<boolean>(false);
    
    const onLoginClick = () => {
        setWhereIsLoginRegisterPage('login');
    }
    const onSignupClick = () => {
        if (
            emailState.trim().length > 0 && 
            fullnameState.trim().length > 0 && 
            confirmedPassword.trim().length > 0 && 
            firstPassword.trim().length > 0 &&
            pseudo.trim().length > 0
        ) {
            if (firstPassword === confirmedPassword) {
                setConfirmedPasswordOnSignup(confirmedPassword);
                setWhereIsLoginRegisterPage('infos');
            } else {
                setNewToast ('error', "Verify the password you entered.")
            }
        } else {
            setNewToast ("error", "Fill all the fields.");
        }
    }
    return (
        <>
        <div className="space-y-8 w-full">
            <Link 
                className="filledButton inline-block"
                href='/'
            >
                Back to home
            </Link>
            <div className='space-y-2 md:max-w-[70%] text-center mx-auto'>
               <h2>1 - Share with others and learn from them.</h2>
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
                    <label htmlFor="fullname" className="block">Full name: *</label>
                    <input type="text" name="fullname" id="fullname" 
                    defaultValue={fullnameState}
                    onChange={(e) => {
                        setFullnameState(e.target.value);
                        setSignupContentState({ ...signupContentState, fullName: e.target.value })
                    }}
                    placeholder="Full name" required
                    className="border focus:border-black w-full rounded-md p-3"/>
                </div>
                <div className="space-y-1">
                    <label htmlFor="pseudo" className="block">Pseudo: *</label>
                    <input type="text" name="pseudo" id="pseudo" 
                    defaultValue={pseudo}
                    onChange={(e) => {
                        setPseudo(e.target.value);
                        setSignupContentState({ ...signupContentState, pseudo: e.target.value })
                    }}
                    placeholder="Pseudo" required
                    className="border focus:border-black w-full rounded-md p-3"/>
                </div>
                <div className="space-y-1">
                    <label htmlFor="email" className="block">Email: *</label>
                    <input type="email" name="email" id="email" 
                    defaultValue={emailState}
                    onChange={(e) => {
                        setEmailState(e.target.value);
                        setSignupContentState({ ...signupContentState, email: e.target.value });
                    }}
                    placeholder="Email" required
                    className="border focus:border-black w-full rounded-md p-3"/>
                </div>
                <div className="space-y-1">
                    <label htmlFor="password" className="block">Password: *</label>
                    <div className={`flex gap-3 `}>
                        <input name="password" id="password" 
                        type={seenPassword ? "text" : "password"}
                        onChange={(e) =>{ 
                            setFirstPassword(e.target.value);
                            setPasswordCharNumbers(e.target.value.length);
                            setStartedTyping(true);
                        }}
                        placeholder="Password" required
                        className={`border focus:outline-black w-full rounded-md p-3
                            ${(passwordCharNumbers < 8 && startedTyping) ? " !outline-red-500 " : " "}
                        `}/>
                        <p className="text-sm my-auto cursor-pointer"
                        onClick={() => setSeenPassword(!seenPassword)}
                        >{seenPassword ? "Hide" : "See"}</p>
                    </div>
                    {(passwordCharNumbers < 8 && startedTyping) ? <>
                        <p className={`text-sm text-red-500`}>
                            Put at least 8 characters
                        </p>
                    </> : <></>}
                </div>
                <div className="space-y-1">
                    <label htmlFor="confirmPassword" className="block">Confirm your password : *</label>
                    <div className="flex gap-3">
                        <input name="confirmPassword" id="confirmPassword"
                        type={seenConfirmedPassword ? "text" : "password"}
                        onChange={(e) => {setConfirmedPassword(e.target.value); setStartedTypingConfirmation(true)}}
                        placeholder="Repeat your password" required
                        className={`border focus:outline-black w-full rounded-md p-3 ${(startedTypingConfirmation && (firstPassword !== confirmedPassword)) ? " !outline-red-500 "
                            : ""}
                        `}/>
                        <p className="text-sm my-auto cursor-pointer"
                        onClick={() => setSeenConfirmedPassword(!seenConfirmedPassword)}
                        >{seenConfirmedPassword ? "Hide" : "See"}</p>
                    </div>
                    {(startedTypingConfirmation && (firstPassword !== confirmedPassword)) ? <>
                        <p className={`text-sm text-red-500`}>
                            Different from the main password you typed.
                        </p>
                    </> : <></>}
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