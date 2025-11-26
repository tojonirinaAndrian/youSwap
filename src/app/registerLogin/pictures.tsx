import { useGlobalStore } from "@/store/use-global-store"
import { useState } from "react";

export default function Pictures () {
    const { setWhereIsLoginRegisterPage,  } = useGlobalStore();
    const [preview, setPreview] = useState<string>("");
    return <>
        <div className="space-y-8 w-full">
            <button className="filledButton" 
                onClick={() => setWhereIsLoginRegisterPage("skillsProficiency")}
            >Back</button>
            <div className='space-y-2 md:max-w-[70%] text-center mx-auto'>
                <h2>6 - Your pictures!</h2>
                <p className="text-black/70">Let people know how you look like.</p>               
            </div>

            <div className="space-y-2">
                <p>Your profile picture :</p>
                <div className="w-full rounded-sm border border-blueDianne">

                </div>
            </div>
        </div>
    </>
}