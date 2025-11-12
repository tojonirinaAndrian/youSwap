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
    const { whereIsLoginRegisterPage, setWhereIsLoginRegisterPage } = useGlobalStore();
    const [activeGender, setActiveGender] = useState<string>('male')
    const [textAreaInput, setTextAreaInput] = useState<string>("");
    return (<>
        <div className="space-y-8 w-full">
            <button className="filledButton" 
                onClick={() => setWhereIsLoginRegisterPage("signup")}
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
                        onClick={()=>{setActiveGender('male')}}
                        >Man<Mars /></button>
                        <button className={`flex gap-1 ${activeGender==='female' ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                        onClick={()=>{setActiveGender('female')}}
                        >Women<Venus /></button>
                        <button className={`flex gap-1 ${activeGender==='other' ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                        onClick={()=>{setActiveGender('other')}}
                        >Other</button>
                    </div>
                </div>
                <div className="space-y-1">
                    <p>How old are you ?</p>
                    <div>
                        <input type="number" min={5} max={100} placeholder="Your age"
                        className="border focus:border-black w-full rounded-md p-3"/>
                    </div>
                </div>
                <div className="space-y-1">
                    <p>What do you do for a living ?</p>
                    <div>
                        <input type="text" placeholder="examples: teacher, student, musician"
                        className="border focus:border-black w-full rounded-md p-3"/>
                    </div>
                </div>
                <div className="space-y-1">
                    <p>Describe yourself. Let people know How working with you is.</p>
                    <div>
                        <textarea placeholder='"Wait a minute, Who Are You ???"'
                        className="border focus:border-black w-full rounded-md p-3"
                        maxLength={500} id="whoAreYouTextArea" onChange={(e)=>{
                            setTextAreaInput (e.target.value)
                        }}
                        />
                        <div className="flex">
                            <p className="text-sm ml-auto">{textAreaInput.length}/500</p>                        
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="filledButton !w-full"
            onClick={() => {
                setWhereIsLoginRegisterPage('skills')
            }}
            >Continue signing up</button>
        </div>
    </>)
}