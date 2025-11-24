'use client';

import { useGlobalStore } from "@/store/use-global-store";
import { X } from "lucide-react";
export default function ToastNotification (props: { 
    toastType: "error" | "simple",
    content: string,
    toastId: string
}) {
    const { closeToast } = useGlobalStore()
    return <div className="w-full md:w-fit md:max-w-[90vw] font-medium">
        {(props.toastType === "error") ? <>
            <div className={`relative flex`}>
                <div className={`px-5 py-4 first-letter:capitalize bg-red-100 text-red-600 w-full rounded-md`}>
                    <p>{props.content}</p>
                </div>
                <div 
                onClick={() => closeToast(props.toastId)}
                className={`absolute -top-1 -right-1 bg-red-500 hover:bg-red-400 p-1 cursor-pointer text-white rounded-[5px]`}><X size={15}/></div>
            </div>
        </> : <>
            <div className={`relative flex`}>
                <div className={`px-5 py-4 first-letter:capitalize bg-blue-100 text-blue-800 w-full rounded-md`}>
                    <p>{props.content}</p>
                </div>
                <div 
                onClick={() => closeToast(props.toastId)}
                className={`absolute -top-1 -right-1 bg-red-500 hover:bg-red-400 p-1 cursor-pointer text-white rounded-[5px]`}><X size={15}/></div>
            </div>
        </>}
        
    </div>
}