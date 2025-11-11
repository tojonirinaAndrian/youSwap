'use client';
import { useState } from "react";
import UserState from "../userState";
import { useGlobalStore } from "@/store/use-global-store";
import { PencilLine, User } from "lucide-react";

export default function ProfileView (props: {setWhereIsProfile: (arg0: "view" | "modify") => void}) {
    const { userProfile } = useGlobalStore ();
    const [whereIsSkills, setWhereIsSkills] = useState<'learn' | 'teach'> ('teach');
    return <>
        <div className="flex justify-between">
            <div className="flex gap-2 my-auto">
                <User /><h3>Profile</h3>
            </div>
            <div>
                <button className="borderedButton flex gap-2"
                onClick={() => {
                    props.setWhereIsProfile ('modify')
                }}
                >
                    <PencilLine size={18} className="my-auto"/>
                    Modify
                </button>
            </div>
        </div>
        <div className="gap-2 flex flex-col h-full overflow-auto space-y-5">
            <div className="flex gap-3 bg-blueDianne/10 p-3 w-fit rounded-2xl mx-auto">
                <div className="relative rounded-full bg-red-500 h-28 w-28 flex">
                </div>
                <div className="flex flex-col justify-center ">
                    <UserState
                        isInSidebar = {false}
                        user={userProfile}
                    />
                </div>
            </div>
            <div className="w-full border-1 border-blueDianne/50 grid grid-cols-2 rounded-md">
                <div className="border-r-1 border-blueDianne/50 p-5 text-right">
                    Done Appointments
                </div>
                <div className="p-5">
                    {userProfile.doneAppointmentsNumber}
                </div>
                <div className="border-r-1 border-t-1 border-blueDianne/50 p-5 text-right">
                    Accumulated points
                </div>
                <div className="p-5 border-t-1 border-blueDianne/50">
                    {userProfile.accumulatedPoints}
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="max-w-[55vw] flex flex-col gap-2 p-5 rounded-md">
                    <h2 className="text-center">
                        {`"${userProfile.profileDescription}"`}
                    </h2>
                    <p className="ml-auto italic text-blueDianne">
                        ~ {userProfile.pseudo} ~
                    </p>
                </div>
            </div>
            <div className="w-full space-y-2">
                <div className="flex gap-2">
                    <button className={(whereIsSkills==='teach' ? "filledStyle" : "unfilledStyle")}
                    onClick={() => setWhereIsSkills('teach')}                    
                    >{`I can teach`}</button>
                    <div className="w-[5px] out h-[5px] bg-blueDianne/50 my-auto rounded-full"></div>

                    <button className={(whereIsSkills==='learn' ? "filledStyle" : "unfilledStyle")}
                    onClick={() => setWhereIsSkills('learn')}
                    >I want to learn</button>
                </div>
                <div className="flex gap-2 *:p-5">
                    <div className="rounded-md border w-[70%] border-blueDianne/50 space-x-2 space-y-2 *:p-2 *:border-1 *:h-fit *:inline-block *:rounded-md">
                        {(whereIsSkills === 'learn' && <>
                            {(userProfile.choosedLearningSkills.map((skill, i) => {
                                let color: "yellow" | "green" | "red";
                                if (skill.proficiency === 'Beginner') {
                                    color = "green"
                                } else if (skill.proficiency === 'Advanced') { 
                                    color = "red" 
                                } else { 
                                    color = "yellow"
                                }
                                return <div key={i} className={`bg-${color}-200 border-${color}-300 text-${color}-700`}>
                                    {skill.skillItself.name}
                                </div>
                            }))}
                        </>)}
                        {(whereIsSkills === 'teach' && <>
                            {(userProfile.choosedTeachingSkills.map((skill, i) => {
                                let color: "yellow" | "green" | "red";
                                if (skill.proficiency === 'Beginner') {
                                    color = "green"
                                } else if (skill.proficiency === 'Advanced') { 
                                    color = "red" 
                                } else { 
                                    color = "yellow" 
                                }
                                return <div key={i} className={`text-${color}-700 bg-${color}-200 border-${color}-300`}>
                                    {skill.skillItself.name}
                                </div>
                            }))}
                        </>)}
                    </div>
                    <div className="w-[30%] space-y-2 my-auto">
                        <div className="flex gap-2">
                            <div className="h-[20px] w-[20px] bg-red-200 rounded-full border border-red-300"></div>
                            <p className="text-sm my-auto text-red-700">Advanced skills</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-[20px] w-[20px] bg-yellow-200 rounded-full border border-yellow-300"></div>
                            <p className="text-sm my-auto text-yellow-700">Intermediate skills</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-[20px] w-[20px] bg-green-200 rounded-full border border-green-300"></div>
                            <p className="text-sm my-auto text-green-700">Beginner skills</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-full space-y-2">
                <h3 className="text-blueDianne">Pictures</h3>
                <div className="space-x-1 *:inline-block *:rounded-md">
                    <div className="w-[200px] h-[200px] bg-blue-200"></div>
                    <div className="w-[200px] h-[200px] bg-red-200"></div>
                    <div className="w-[200px] h-[200px] bg-yellow-200"></div>
                    <div className="w-[200px] h-[200px] bg-green-200"></div>
                </div>
            </div>
            <div className="w-full gap-2 flex flex-col">
                <h3 className="text-blueDianne">Portfolio</h3>
                <div className="w-[400px] h-[300px] bg-black rounded-md text-white p-3">This is a video</div>
                <div className="space-y-0.5">
                    {(userProfile.portfolioLinks.map((portfolioLink) => {
                        return <p key={portfolioLink.label}>
                            <span className="font-medium capitalize">{portfolioLink.label} : </span>
                            <span className="underline text-blueDianne">{portfolioLink.link}</span>
                        </p>
                    }))}
                </div>
            </div>
        </div>
    </>
}