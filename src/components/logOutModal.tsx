'use client';
import { X } from "lucide-react"
import { logoutFunction } from "../requests/authentification"
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/use-global-store";
import { useState } from "react";

interface logOutModalProps {
    setIsLoggingOut: (arg0: boolean) => void
};

export default function LogOutModal (props: logOutModalProps) {
    const router = useRouter();
    const [loggingOut, setIsLoggingOut] = useState<boolean>(false);
    const {setNewToast, setProfileToZero} = useGlobalStore();
    const onLogoutClick = async () => {
        setIsLoggingOut(true);
        const answer = await logoutFunction ();
        if (answer === "logoutSuccessful") {
            setProfileToZero()
            router.push("/");
        } else {
            setNewToast("error", "An error occured when logging out. Try again.");
        }
    }
    
    return (
        <>
        <div className="w-full h-screen z-11 fixed flex top-0 left-0 py-10 px-5">
            {!loggingOut ? <div className="m-auto bg-white p-5 rounded-xl space-y-3 min-w-[20rem] z-2 max-h-full overflow-auto">
                <div className="w-full flex justify-end">
                    <div className="cursor-pointer"
                    onClick={() => props.setIsLoggingOut(false)}
                    >
                        <X size={20}/>
                    </div>
                </div>
                <h3 className="text-center">Log Out ?!</h3>
                <div className="flex *:w-full *:rounded-md *:px-5 *:py-3 gap-2 mt-10 *:cursor-pointer">
                    <button 
                    onClick={() => onLogoutClick()}
                    className="hover:bg-red-200 bg-red-100 text-red-800">
                        Log out
                    </button>
                    <button className="hover:bg-blueDianne/20 bg-blueDianne/5 text-blueDianne"
                    onClick={() => props.setIsLoggingOut(false)}
                    >Cancel</button>
                </div>
            </div> : <div className="m-auto bg-white p-5 rounded-xl flex min-w-[20rem] z-2 max-h-full overflow-auto">
                <h3 className="uppercase opacity-70 text-red-700 mx-auto">Logging you out...</h3>
            </div>}
            <div className="w-full h-screen fixed top-0 left-0 bg-black/70"
                onClick={() => props.setIsLoggingOut(false)}
            ></div>
        </div>
        </>
    )
} 