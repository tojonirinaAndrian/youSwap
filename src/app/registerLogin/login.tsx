'use client';
import { getCurrentlyLoggedInUser, loginFunction } from "@/src/requests/authentification";
import { useGlobalStore } from "@/store/use-global-store";
import { useState } from "react";
import Link from "next/link";
import { userType } from "@/src/types/userProfilesType";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()
    const { setWhereIsLoginRegisterPage, setNewToast, setUserProfile } = useGlobalStore()
    const [seenPassword, setSeenPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onSignupClick = (): void => {
        setWhereIsLoginRegisterPage('signup');
    }
    
    const onLoggingIn = async () => {
        if (email.trim().length > 0 && password.trim().length > 0) {
            const answer: "loggedIn" | "alreadyLoggedIn" |"incorrectPassword" | "emailDoesNotExist" = await loginFunction (email.trim(), password.trim());
            console.log("answer : " + answer);
            if (answer === "emailDoesNotExist") {
                setNewToast("error", "Check your email, maybe it's wrong or create an account with it.")
            } else if (answer === "incorrectPassword") {
                setNewToast("error", "Incorrect password.");
            } else if (answer === "loggedIn" || answer === "alreadyLoggedIn") {
                console.log("loggedIn");
                // const user: userType = await getCurrentlyLoggedInUser();
                // if (user) {
                //     setUserProfile (user);
                //     router.push("/user");
                // }
            }
        } else {
            setNewToast("error", "Please, fill the fields.");
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
                        className="border focus:border-black w-full rounded-md p-3"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="block">Password: *</label>
                        <div className="flex gap-3">
                            <input  name="password" id="password"
                            type={seenPassword ? "text" : "password"}
                            placeholder="Password" required
                            className="border focus:border-black w-full rounded-md p-3"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            />
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
                <p>You {`don't`} have an account yet ? Click <span
                className="underline text-blueDianne cursor-pointer"
                onClick={() => onSignupClick()}
                >
                    Here
                </span></p>
                <button type="button" className="filledButton !w-full"
                onClick={() => onLoggingIn()}
                >Log in</button>                
            </div>
        </>
    )
}