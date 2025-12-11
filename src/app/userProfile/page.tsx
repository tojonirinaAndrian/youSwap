'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/use-global-store";
import { userType } from "@/src/types/userProfilesType";
import { getCurrentlyLoggedInUser } from "@/src/requests/authentification";
import { User, ArrowLeft } from "lucide-react";
import UserState from "@/src/components/userState";
import Image from "next/image";

export default function UserProfile () {
    const { seeingProfile, userProfile } = useGlobalStore();
    const router = useRouter();
    const [whereIsSkills, setWhereIsSkills] = useState<'learn' | 'teach'> ('teach');
    
    return <>
    <div className="h-full flex flex-col gap-5">
        <div className="flex justify-between">
            <div className="flex gap-2 *:my-auto">
                <button 
                className="borderedButton"
                onClick={() => router.back()}
                >
                    <ArrowLeft />
                </button>
                <div className="relative h-10 w-10 flex">
                    <Image 
                        width={500}
                        height={500}
                        src={seeingProfile.profilePicture}
                        alt="Profile Picture"
                        className="w-full h-full object-cover rounded-full bg-red-500"
                    />
                </div>
                <h3>
                    {seeingProfile.fullName}
                </h3>
            </div>
            <button className="filledButton">Say Hello</button>    
        </div>
        <div className="gap-2 flex flex-col h-full overflow-auto space-y-5">
            <div className="flex gap-3 bg-blueDianne/10 p-3 w-fit rounded-2xl mx-auto">
                <div className="relative h-28 w-28 flex">
                    <Image 
                        width={500}
                        height={500}
                        src={seeingProfile.profilePicture}
                        alt="Profile Picture"
                        className="w-full h-full object-cover rounded-full bg-red-500"
                    />
                </div>
                <div className="flex flex-col justify-center ">
                    <UserState
                        isInSidebar = {false}
                        user={seeingProfile}
                    />
                </div>
            </div>
            <div className="w-full border-1 border-blueDianne/50 grid grid-cols-2 rounded-md">
                <div className="border-r-1 border-blueDianne/50 p-5 text-right">
                    Done Appointments
                </div>
                <div className="p-5">
                    {seeingProfile.doneAppointmentsNumber}
                </div>
                <div className="border-r-1 border-t-1 border-blueDianne/50 p-5 text-right">
                    Accumulated points
                </div>
                <div className="p-5 border-t-1 border-blueDianne/50">
                    {seeingProfile.accumulatedPoints}
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="max-w-[55vw] flex flex-col gap-2 p-5 rounded-md">
                    <h2 className="text-center">
                        {`"${seeingProfile.profileDescription}"`}
                    </h2>
                    <p className="ml-auto italic text-blueDianne">
                        ~ {seeingProfile.pseudo} ~
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
                            {(seeingProfile.choosedLearningSkills.map((skill, i) => {
                                let color: "yellow" | "green" | "red";
                                if (skill.proficiency === 'Beginner') {
                                    color = "green"
                                } else if (skill.proficiency === 'Advanced') { 
                                    color = "red" 
                                } else { 
                                    color = "yellow"
                                }
                                return <div key={i} className={`text-${color}-700 bg-${color}-200 border-${color}-300 outline-3 
                                ${(userProfile.choosedTeachingSkills.map((mappedSkill) => { 
                                        if (skill.skillId === mappedSkill.skillId) return true
                                    })
                                ) ? ` outline-${color}-500 ` : " outline-transparent "}
                                `}>
                                    {skill.skillItself.name}
                                </div>
                            }))}
                        </>)}
                        {(whereIsSkills === 'teach' && <>
                            {(seeingProfile.choosedTeachingSkills.map((skill, i) => {
                                let color: "yellow" | "green" | "red";
                                if (skill.proficiency === 'Beginner') {
                                    color = "green"
                                } else if (skill.proficiency === 'Advanced') { 
                                    color = "red" 
                                } else { 
                                    color = "yellow" 
                                }
                                return <div key={i} className={`text-${color}-700 bg-${color}-200 border-${color}-300 outline-3 ${
                                    (userProfile.choosedLearningSkills.map((mappedSkill) => { 
                                        if (skill.skillId === mappedSkill.skillId) return true
                                    })
                                ) ? ` outline-${color}-500 ` : " outline-transparent "}
                                `}>
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
        </div>
    </div>
    </>
}