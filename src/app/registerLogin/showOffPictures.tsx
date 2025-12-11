import { useGlobalStore } from "@/store/use-global-store"
import { useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";
import { getCurrentlyLoggedInUser, signupFunction } from "@/src/requests/authentification";
import { useRouter } from "next/navigation";
import { userType } from "@/src/types/userProfilesType";

export default function ShowOffPictures () {
    const { setWhereIsLoginRegisterPage, setNewToast, setUserProfile, setSignupContentState, setSignupToZero, signupContentState, confirmedPasswordOnSignup } = useGlobalStore();
    const [previews, setPreviews] = useState<string[]>(signupContentState.pictures);
    const [isDraging, setIsDraging] = useState<boolean>(false);
    const [loggingLoading, setLoggingLoading] = useState<boolean>(false);

    const router = useRouter();
    const maximum = 6;
    window.ondragover = (e) => {
        e.preventDefault();
        setIsDraging(true);
    }
    window.ondrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer && isDraging) {
            const files: FileList = e.dataTransfer.files;
            handleSelectedFile(files);
            setIsDraging(false);
        }
    }
    const handleSelectedFile = (files: FileList) => {
        if (files) {
            let mockPreviews: string[] = [...previews];
            const left: number = maximum - previews.length;
            if (files.length > left) {
                setNewToast("error", "You hit the maximum number. Some pictures aren't uploaded.")
            }
            for (let i = 0; i < left; i++) {
                if (files[i]) {
                    if (files[i].type === "image/png" || files[i].type === "image/jpeg" || files[i].type === "image/webp" || files[i].type === "image/jpg") {
                        const url: string = URL.createObjectURL(files[i]);
                        mockPreviews.push(url);
                    } else {
                        setNewToast("error", "Please chose a .png, .jpeg or .webp image file.");
                        continue;
                    }
                } else {
                    break
                }
            }
            setPreviews(mockPreviews);
        }
    }
    const handleSave = async () => {
        setLoggingLoading(true);
        setSignupContentState({ ...signupContentState, pictures: previews });
        console.log("final User before Saving " + { ...signupContentState, pictures: previews });
        const response = await signupFunction({
            password: confirmedPasswordOnSignup, 
            userInfos: { ...signupContentState, pictures: previews },
            returnToDefault: () => {
                setSignupToZero();
                setWhereIsLoginRegisterPage("signup");
            }
        });
        // router
        const currentUser: userType = await getCurrentlyLoggedInUser();
        setUserProfile(currentUser);
        router.push("/user");
        console.log("final User after saving " + currentUser);
    }

    return <>
    {isDraging ? <>
        <div className="w-screen h-screen fixed top-0 right-0 bg-black/80 flex backdrop-blur-[5px] z-10 p-5">
            <h3 className="m-auto text-white">Drop your files anywhere here.</h3>
        </div>
    </> : <></>}
    <div className="space-y-8 w-full relative">   
        <button className="filledButton" 
            onClick={() => setWhereIsLoginRegisterPage("profilePicture")}
        >Back</button>
        <div className='space-y-2 md:max-w-[70%] text-center mx-auto p-2'>
            <h2>7 - Your show-off pics!</h2>
            <p className="text-black/70">Show people how you look practising your Skills. Put {maximum} pictures at most.</p>              
        </div>
        <div className="flex flex-col gap-2">
            <p className="text-center">
                {previews.length}/{maximum}
            </p>
            {previews.length < maximum ? <>
            <div className={`w-full p-3 rounded-sm flex bg-blue-200 relative`}>
                <input
                style={{ display: "none" }}
                id="showOffPictures"
                type="file"
                onChange={(e) => {
                    const fileList = e.target.files as FileList;
                    // console.log(fileList)
                    if (fileList.length > 0) {
                        handleSelectedFile(fileList);
                    }
                }}/>
                <label 
                htmlFor="showOffPictures" 
                className={`w-full h-full flex cursor-pointer`}
                >
                    <p className="m-auto text-center">Drop or click to upload.</p>
                </label>
            </div>
            </> : <></>}
            {(previews.length > 0) ? <div
            className="grid grid-cols-2 gap-2"
            >
                {previews.map((preview, i) => {
                if (preview !== "") {
                    return <div  key={i}>
                    <div className="w-full relative">
                        <Image 
                            width={500}
                            height={500}
                            src={preview} 
                            alt={`Picture ${i}`} 
                            className="w-full rounded-sm"
                        />
                        <div className="p-2 opacity-80 hover:opacity-100 rounded-md bg-red-200 text-red-500 absolute top-[5px] right-[5px] cursor-pointer"
                        onClick={() => {
                            const mockPreviews: string[] = [];
                            previews.map((oldPreview) => {
                                if (preview !== oldPreview) {
                                    mockPreviews.push(oldPreview)
                                }
                            })
                            setPreviews (mockPreviews)
                        }}
                        ><Trash size={20}/></div>
                    </div>
                    </div>    
                }
            })}
            </div> : <></>}
        </div>
        { loggingLoading ?
        <div className="">
            <button className="w-full filledButton opacity-50"
                onClick={() => { setNewToast("error", "Upload at least a picture.") }}
            >Signing you up...</button>
        </div> : 
        <div className="">
            { previews.length > 0 ? <>
                <button className="w-full filledButton"
                onClick={() => {
                    handleSave();
                    // console.log (previews);
                }}
                >Save pictures</button>
            </> : <>
                <button className="w-full filledButton opacity-50"
                onClick={() => { setNewToast("error", "Upload at least a picture.") }}
                >Save profiles</button>
            </> }
        </div>
        }
        
    </div>
    </>
} 