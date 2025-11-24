'use client';

import { useGlobalStore } from "@/store/use-global-store";
import { X } from "lucide-react";
export default function ToastNotification (props: { 
    toastType: "error" | "simple",
    content: string,
    toastId: string
}) {
    const oppositeColor: "red" | "blue" = (props.toastType === "simple" ? "red" : "blue") 
    const { closeToast } = useGlobalStore()
    return <div className="w-full md:w-fit md:max-w-[90vw]">
        {(props.toastType === "error") ? <>
            <div className={`relative border-2 border-red-500 flex font-medium text-red-700 rounded-md w-full`}>
                <div className={`border-r-2 rounded-l-md border-r-red-500 bg-red-300 px-5 py-4 flex items-center`}>
                    <p className="uppercase">
                        Error
                    </p>
                </div>
                <div className={`px-5 py-4 capitalize bg-red-50 rounded-r-md`}>
                    <p>{props.content}</p>
                </div>
                <div 
                onClick={() => closeToast(props.toastId)}
                className={`absolute -top-1 -right-1 bg-blue-500 p-1 cursor-pointer text-white rounded-[5px]`}><X size={15}/></div>
            </div>
        </> : <>
            <div className={`relative border-2 border-blue-500 flex font-medium text-blue-700 rounded-md w-full`}>
                <div className={`border-r-2 rounded-l-md border-r-blue-500 bg-blue-300 px-5 py-4 flex items-center`}>
                    <p className="uppercase">
                        Note
                    </p>
                </div>
                <div className={`px-5 py-4 capitalize bg-blue-50 rounded-r-md`}>
                    <p>{props.content}</p>
                </div>
                <div 
                onClick={() => closeToast(props.toastId)}
                className={`absolute -top-1 -right-1 bg-red-600 p-1 cursor-pointer text-white rounded-[5px]`}><X size={15}/></div>
            </div>
        </>}
        
    </div>
}