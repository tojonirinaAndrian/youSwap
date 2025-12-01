'use client';

import DatePicker from "@/src/components/datePicker";
import { useEffect, useRef, useState } from "react";
import { Mars, Venus, Trash, Plus } from "lucide-react";
import { useGlobalStore } from "@/store/use-global-store";
import uuid from "react-uuid";

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
    const [availability, setAvailability] = useState<"InPerson" | "Online" | "Both">(signupContentState.availablility);
    const handleDeletePortfolioLink = (linkId: string) => {
        const mock: {link: string,label: string, id: string}[] = [];
        signupContentState.portfolioLinks.map (mockLink => {
            if (mockLink.id !== linkId) {
                mock.push(mockLink)
            }
        });
        setSignupContentState ({
            ...signupContentState,
            portfolioLinks: mock
        })
    }
    const handleAddPortfolioLink = () => {
        const mockLinks: {
            id: string,
            label: string, link: string
        }[] = [ ...signupContentState.portfolioLinks ];
        const newUuid: string = uuid();
        mockLinks.push({
            label: "", link: "", id: newUuid
        })
        setSignupContentState({
            ...signupContentState,
            portfolioLinks: mockLinks
        })
    }
    return (<>
        <div className="space-y-8 w-full">
            <button className="filledButton" 
                onClick={() => {
                    // console.log(signupContentState);
                    setWhereIsLoginRegisterPage("signup")
                }}
            >Back</button>
            <div className='space-y-2 md:max-w-[70%] text-center mx-auto'>
               <h2>2 - Who are you ?</h2>
               <p className="text-black/70">Tell us more about you.</p>
            </div>       
            <div className="space-y-8 w-full">
                <div className="space-y-1">
                    <p className="text-black/70">Are you a man or a woman ?</p>
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
                    <p  className="text-black/70">How old are you ?</p>
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
                    <p  className="text-black/70">Describe yourself. Let people know who you are and how working with you is.</p>
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
                <div className="space-y-1">
                    <p className="text-black/70">What's your appointments'type preference ?</p>
                    <div className="flex gap-2">
                        <button className={`flex gap-1 ${availability==='InPerson' ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                        onClick={()=>{
                            setAvailability('InPerson');
                            setSignupContentState({ ...signupContentState, availablility: "InPerson" })
                        }}
                        >In person</button>
                        <button className={`flex gap-1 ${availability==='Online' ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                        onClick={()=>{
                            setAvailability('Online');
                            setSignupContentState({ ...signupContentState, availablility: "Online" })
                        }}
                        >Online</button>
                        <button className={`flex gap-1 ${availability==='Both' ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                        onClick={()=>{
                            setAvailability('Both');
                            setSignupContentState({ ...signupContentState, availablility: "Both" })
                        }}
                        >Both</button>
                    </div>
                </div>
                <div className="space-y-1">
                    <p  className="text-black/70">Give us links to your personnals on the internet. I mean Social media, Github account or personnal portfolio website if you want to.</p>
                    <div className="space-y-1">
                        {(signupContentState.portfolioLinks.map((link) => {
                            return <div className="flex gap-2" key={link.id}>
                                <input type="text" placeholder='Link label' defaultValue={link.label} className='not-focus:text-black/80 border-black/50 px-3 py-2 border-1 rounded-md'/>
                                <p className='m-auto'>:</p> 
                                <input type='text' placeholder='Link address' defaultValue={link.link}
                                className='not-focus:text-black/80 border-black/50 px-3 py-2 border-1 rounded-md w-full'
                                />
                                <button className='bg-red-100 flex gap-2 hover:bg-red-200 text-red-700 p-2 rounded-md items-center cursor-pointer'
                                onClick={() => {
                                    handleDeletePortfolioLink(link.id)
                                }}
                                ><Trash size={18}/>Delete</button>
                            </div>
                        }))}
                        {(signupContentState.portfolioLinks.length < 5) && <>
                            <div 
                                onClick={() => {
                                    handleAddPortfolioLink()
                                }}
                                className='cursor-pointer w-full px-5 py-3 flex bg-blueDianne/10 hover:bg-blueDianne/25 hover:text-blueDianne gap-2 border rounded-md  text-blueDianne/70 justify-center'>
                                <Plus />
                                <p>Add a new link</p>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
            <button type="button" className="filledButton !w-full"
            onClick={() => {
                if (age >= 10) {
                    if (description.trim().length > 0) {
                        let error: boolean = false
                        signupContentState.portfolioLinks.map((link)=>{
                            if (link.label.trim().length <= 0 || link.label.trim().length <= 0) {
                                error = true;
                                setNewToast("error", "Fill links fields first.")
                            }
                        })
                        if (!error) {
                            setWhereIsLoginRegisterPage('skills');
                        }
                    } else {
                        setNewToast("error", "Fill the description field.");
                    }
                } else {
                    setNewToast("error", "You should be at least 10 years old.");
                }
                // console.log(signupContentState);
            }}
            >Continue signing up</button>
        </div>
    </>)
}