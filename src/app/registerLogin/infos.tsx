'use client';

import DatePicker from "@/src/components/datePicker";
import { useEffect, useRef, useState } from "react";
import { Mars, Venus } from "lucide-react";
import { useGlobalStore } from "@/store/use-global-store";

function formatDate(date: Date | undefined) {
    if (!date) {
      return ""
    }
  
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
}
  
function isValidDate(date: Date | undefined) {
    if (!date) {
      return false
    }
    return !isNaN(date.getTime())
}


export default function InfosPage() {
    const { whereIsLoginRegisterPage, setNewToast, setWhereIsLoginRegisterPage, setSignupContentState, signupContentState } = useGlobalStore();
    const [activeGender, setActiveGender] = useState<"male" | "female" | "other">(signupContentState.gender);
    const [description, setDescription] = useState<string>(signupContentState.profileDescription)
    const [age, setAge] = useState<number>(signupContentState.age);

    return (<>
        <div className="space-y-8 w-full">
            <button className="filledButton" 
                onClick={() => {
                    // console.log(signupContentState);
                    setWhereIsLoginRegisterPage("signup")
                }}
            >Back</button>
            <div className='space-y-2 md:max-w-[70%] text-center mx-auto'>
               <h2>Who are you ?</h2>
               <p className="text-black/70">Tell us more about you.</p>
            </div>       
            <div className="space-y-8 w-full">
                <div className="space-y-1">
                    <p>Are you a man or a woman ?</p>
                    <div className="flex gap-2">
                        <button className={`flex gap-1 ${activeGender==='male' ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                        onClick={()=>{
                            setActiveGender('male');
                            setSignupContentState({ ...signupContentState, gender: "male" })
                        }}
                        >Man<Mars /></button>
                        <button className={`flex gap-1 ${activeGender==='female' ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                        onClick={()=>{
                            setActiveGender('female');
                            setSignupContentState({ ...signupContentState, gender: "female" })
                        }}
                        >Women<Venus /></button>
                        <button className={`flex gap-1 ${activeGender==='other' ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                        onClick={()=>{
                            setActiveGender('other');
                            setSignupContentState({ ...signupContentState, gender: "other" })
                        }}
                        >Other</button>
                    </div>
                </div>
                <div className="space-y-1">
                    <p>How old are you ?</p>
                    <p className="text-sm">You have to be <span className="font-medium">10 years old at least</span>.</p>
                    <div>
                        <input type="number" min={10} max={100} placeholder="Your age"
                        defaultValue={age}
                        onChange={(e) => {
                            setAge(Number(e.target.value));
                            setSignupContentState({
                                ...signupContentState,
                                age: Number(e.target.value)
                            })
                        }}
                        className="border focus:border-black w-full rounded-md p-3"/>
                    </div>
                </div>
                <div className="space-y-1">
                    <p>Describe yourself. Let people know who you are and how working with you is.</p>
                    <div>
                        <textarea placeholder='"Wait a minute, Who Are You ???"'
                        className="border focus:border-black w-full rounded-md p-3"
                        maxLength={500} id="whoAreYouTextArea" 
                        defaultValue={description}
                        onChange={(e)=>{
                            setDescription (e.target.value);
                            setSignupContentState({
                                ...signupContentState,
                                profileDescription: e.target.value
                            })
                        }}
                        />
                        <div className="flex">
                            <p className="text-sm ml-auto">{description.length}/500</p>                        
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="filledButton !w-full"
            onClick={() => {
                if (age > 10) {
                    if (description.trim().length > 0) {
                        setNewToast("simple", "Alright. We continue.");
                        setWhereIsLoginRegisterPage('skills');
                    } else {
                        setNewToast("error", "Fill the description field.");
                    }
                } else {
                    setNewToast("error", "You should be at least 10 years old.");
                }
            }}
            >Continue signing up</button>
        </div>
    </>)
}