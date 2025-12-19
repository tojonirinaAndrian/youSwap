"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { userType } from "../types/userProfilesType";
import { useGlobalStore } from "@/store/use-global-store";
import Image from "next/image";
import { sayHelloFunction } from "../requests/conversations";

interface sayHelloModalProps {
    setIsSayHelloOpen: (arg0: boolean) => void,
    userToSendTo: userType,
    commonSkillIds: string[]
}

export default function SayHelloModal (props: sayHelloModalProps) {
    const [messageContent, setMessageContent] = useState<string>("");
    const {setNewToast} = useGlobalStore();
    const [isSending, setIsSending] = useState<boolean>(false);
    const handleOnSend = async () => {
        const answer: string = await sayHelloFunction(props.userToSendTo, messageContent, props.commonSkillIds)
        if (answer === "error") {
            setNewToast("error", "An error happened.");
        } else {
            setNewToast("simple", "Request sent successfuly.")
        }
        setIsSending(false);
        props.setIsSayHelloOpen(false);
    }
    return <>
    <div className="w-full h-screen z-10 fixed flex top-0 left-0 p-5">
        <div className="m-auto bg-white p-5 rounded-xl space-y-3 min-w-[20rem] z-2 max-h-full overflow-auto">
            <div className="w-full flex justify-between *:my-auto">
                <div className="flex gap-2 *:my-auto">
                    <div className="w-[30px] h-[30px]">
                        <Image width={500} height={500}
                        alt="pfp"
                        src={props.userToSendTo.profilePicture}
                        className="rounded-full w-full h-full object-cover bg-red-500"
                        />
                    </div>
                    <p className="font-medium">{props.userToSendTo.pseudo}</p>
                </div>
                <div 
                onClick={() => props.setIsSayHelloOpen(false)}
                className="p-1 cursor-pointer rounded-md hover:bg-red-200 hover:text-red-700">
                    <X size={20}/>
                </div>
            </div>
            <textarea 
            className="w-full bg-blueDianne/10 p-3 focus:outline focus:outline-blueDianne/50 rounded-md" 
            placeholder="write something..."
            defaultValue={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            />
            <div className="flex gap-2 *:!w-full w-full">
                <button 
                onClick={() => (!isSending && messageContent.trim.length > 0) && props.setIsSayHelloOpen(false)}
                className={`
                ${isSending ? " opacity-50 " : "  "}
                unfilledStyle !bg-blueDianne/10 hover:!bg-red-200 hover:!text-red-700`}>Cancel</button>
                <button 
                onClick={() => {
                    if (messageContent.trim.length <= 0) {
                        setNewToast("error", "Write something.")
                    } 
                    if (!isSending && messageContent.trim.length > 0) {
                        setIsSending(true);
                        handleOnSend();
                    }
                }}
                className={`
                ${isSending ? " opacity-50 " : "  "}
                filledStyle hover:!bg-blueDianne/90`}>
                    {isSending ? "Sending..." : "Send request"}
                </button>
            </div>
        </div>
        <div className="w-full h-screen fixed top-0 left-0 bg-black/70"
            onClick={() => props.setIsSayHelloOpen(false)}
        ></div>
    </div>
    </>
}