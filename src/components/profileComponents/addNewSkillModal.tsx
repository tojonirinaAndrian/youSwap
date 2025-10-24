'use client';
import skillInterface, { rawSkillInterface } from "@/src/types/skillsType";
import profileInterface from "@/src/types/userProfilesType";
import { X, Search, FileWarning, MarsStroke, MailWarning } from "lucide-react";
import { useState } from "react";

interface addNewSkillModalProps {
    setNewSkillOpen: (arg0: boolean) => void,
    whereIsSkills: 'teach' | "learn",
    setProfileState: (arg0: profileInterface) => void,
    profileState: profileInterface,
}

export default function AddNewSkillModal (props: addNewSkillModalProps) {
    const [newSkillsList, setNewSkillsList] = useState<skillInterface[]> (
        props.whereIsSkills === "learn" ? props.profileState.skills.learnSkills
        : props.profileState.skills.teachSkills
    );
    function handleDoneChoosing () {
        if (props.whereIsSkills === 'learn') {
            props.setProfileState({
                ...props.profileState,
                skills : {
                    ...props.profileState.skills,
                    learnSkills : [
                        ...newSkillsList
                    ]
                }
            })
        } else {
            props.setProfileState({
                ...props.profileState,
                skills : {
                    ...props.profileState.skills,
                    teachSkills : [
                        ...newSkillsList
                    ]
                }
            })
        }
        props.setNewSkillOpen(false);
    }
    function handleOnSkillClick (skill: rawSkillInterface) {
        setNewSkillsList ([
            ...newSkillsList, 
            {
                ...skill,
                level: 'intermediate'
            }
        ])
    }

    return <>
        <div className="w-full h-screen z-1 fixed flex top-0 left-0 py-10 px-5">
            <div className="m-auto bg-white p-5 rounded-xl space-y-5 w-full md:w-[80dvw] z-2 max-h-full overflow-auto">
                <div className="w-full flex justify-end">
                    <div className="cursor-pointer"
                    onClick={() => props.setNewSkillOpen(false)}
                    >
                        <X size={20}/>
                    </div>
                </div>
                <h3 className="text-center">Skills you may {props.whereIsSkills === "learn" ? "learn" : "teach"}</h3>
                <div className="space-y-1">
                    <p className="text-black/70">Currently choosed skills :</p>
                    <div className="flex gap-2">
                        {newSkillsList.map((skill) => {
                            return <>
                                <div className="filledStyle !inline-block !cursor-auto">{skill.name}</div>
                            </>
                        })}
                    </div>
                </div>
                
                {(newSkillsList.length < 5) ? <>
                    <div className='w-full border rounded-md p-3 flex gap-2'>
                        <input type="text" placeholder="Seach for a skill"
                        className="w-full text-sm"
                        /><Search />
                    </div>

                    {/* Suggestion SKILLS LIST according to the search input SHOULD BE HERE, 
                    When clicking a skill, this one is automatically added to the current list of skills. 
                    */}

                </> : <>
                    <p className="w-full text-center space-x-2 items-center text-red-700 bg-red-100 px-5 py-3 rounded-md">
                        <span>You hit the maximum number of Skills you can add.</span>
                    </p>
                </>}
                <div className="flex *:w-full *:rounded-md *:px-5 *:py-3 gap-2 *:cursor-pointer">
                    <button 
                        className="hover:bg-green-200 bg-green-100 text-green-700"
                        onClick={() => {handleDoneChoosing()}}
                    >Done choosing</button>
                    <button 
                        className="hover:bg-blueDianne/20 bg-blueDianne/5 text-blueDianne"
                        onClick={() => {props.setNewSkillOpen(false)}}
                    >Cancel</button>
                </div>
            </div>
            <div className="w-full h-screen fixed top-0 left-0 bg-black/50"
                onClick={() => props.setNewSkillOpen(false)}
            ></div>
        </div>
    </>
}