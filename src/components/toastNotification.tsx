'use client';

import { useGlobalStore } from "@/store/use-global-store";
import { X } from "lucide-react";
export default function ToastNotification (props: { 
    toastType: "error" | "simple",
    content: string,
    toastId: string
}) {
    const color: "red" | "blue" = (props.toastType === "error") ? "red" : "blue";
    const oppositeColor: "red" | "blue" = (props.toastType === "simple" ? "red" : "blue") 
    const { closeToast } = useGlobalStore()
    return <div className="w-full md:w-fit md:max-w-[90vw]">
        <div className={`relative border-2 border-${color}-500 flex font-medium text-${color}-700 rounded-md w-full`}>
            <div className={`border-r-2 rounded-l-md border-r-${color}-500 bg-${color}-50 px-5 py-4 flex items-center`}>
                <p className="uppercase">
                    {(props.toastType === "error" ? "Error" : "Note")}
                </p>
            </div>
            <div className="px-5 py-4 capitalize bg-white rounded-r-md">
                <p>{props.content}</p>
            </div>
            <div 
            onClick={() => closeToast(props.toastId)}
            className={`absolute -top-1 -right-1 bg-${oppositeColor}-600 p-1 cursor-pointer text-white rounded-[5px]`}><X size={15}/></div>
        </div>
    </div>
}