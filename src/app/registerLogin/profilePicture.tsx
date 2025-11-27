import { useGlobalStore } from "@/store/use-global-store"
import { useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";

export default function ProfilePicture () {
    const { setWhereIsLoginRegisterPage, setNewToast, setSignupContentState, signupContentState } = useGlobalStore();
    const [preview, setPreview] = useState<string>(signupContentState.profilePicture);
    const [isDraging, setIsDraging] = useState<boolean>(false);
    window.ondragover = (e) => {
        e.preventDefault();
        setIsDraging(true);
    }
    window.ondrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer && isDraging) {
            const file: File = e.dataTransfer.files[0];
            handleSelectedFile(file);
            setIsDraging(false);
        }
    }
    const handleSelectedFile = (file: File) => {
        if (file) {
            if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/webp" || file.type === "image/jpg") {
                const url: string = URL.createObjectURL(file);
                setPreview(url);
            } else {
                setNewToast("error", "Please chose a .png, .jpeg or .webp image file.")
            }
        }
    }
    const handleSave = () => {
        setSignupContentState({ ...signupContentState, profilePicture: preview });
        setWhereIsLoginRegisterPage("showOffPictures");
    }
    return <>
        {isDraging ? <>
            <div className="w-screen h-screen fixed top-0 right-0 bg-black/80 flex backdrop-blur-[5px] z-10 p-5">
                <h3 className="m-auto text-white">Drop it anywhere here.</h3>
            </div>
        </> : <></>}
        <div className="space-y-8 w-full relative">
            <button className="filledButton" 
                onClick={() => setWhereIsLoginRegisterPage("skillsProficiency")}
            >Back</button>
            <div className='space-y-2 md:max-w-[70%] text-center mx-auto'>
                <h2>6 - Your profile pic!</h2>
                <p className="text-black/70">Choose your profile picture.</p>               
            </div>

            <div className="flex justify-center">
                <div className={`w-60 h-60 rounded-sm flex bg-blue-200 relative`}>
                    {preview !== "" ? <>
                        <div className="p-2 opacity-80 hover:opacity-100 rounded-md bg-red-200 text-red-500 absolute -top-[10px] -right-[10px] cursor-pointer"
                        onClick={() => { setPreview(""); setSignupContentState({ ...signupContentState, profilePicture: "" }); }}
                        ><Trash size={20}/></div>                    
                    </> : <></>}
                    {preview !== "" ? <>
                    <Image 
                        width={500}
                        height={500}
                        src={preview} 
                        alt="Your profile picture" 
                        className="w-full h-full object-cover rounded-sm"
                    /> 
                    </> : <>
                    <input 
                    style={{ display: "none" }}
                    id="profilePicture"
                    type="file"
                    onChange={(e) => {
                        // handleOnSelection
                        console.log("file selected.");
                        const fileList = e.target.files as FileList
                        if (fileList.length > 0) {
                            const file: File = fileList[0];
                            handleSelectedFile(file);
                        }
                    }}/>
                    <label 
                    htmlFor="profilePicture" 
                    className={`w-full h-full flex cursor-pointer`}
                    >
                        <p className="m-auto text-center">Drop or click to upload.</p>
                    </label>
                    </>}
                </div>
            </div>

            <div className="space-y-2">
                { preview !== "" ? <>
                    <input 
                    style={{ display: "none" }}
                    id="profilePicture"
                    type="file"
                    onChange={(e) => {
                        // handleOnSelection
                        console.log("file selected.");
                        const fileList = e.target.files as FileList
                        if (fileList.length > 0) {
                            const file: File = fileList[0];
                            handleSelectedFile(file);
                        }
                    }}/>
                    <label htmlFor="profilePicture" className="w-full borderedButton block text-center">
                        Change picture
                    </label>
                    <button className="w-full filledButton"
                    onClick={() => {
                        handleSave()
                    }}
                    >Save profile picture changes</button>
                </> : <>
                    <button className="w-full filledButton opacity-50"
                    onClick={() => { setNewToast("error", "Upload a picture first.") }}
                    >Save profile picture</button>
                </> }
            </div>
        </div>
    </>
}