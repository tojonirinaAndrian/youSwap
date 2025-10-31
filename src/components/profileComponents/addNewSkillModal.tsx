'use client';
import ChoosedSkillInterface from "@/src/types/skillsType";
import { SkillInterface } from "@/src/types/skillsType";
import userInterface from "@/src/types/userProfilesType";
import { X, Search} from "lucide-react";
import { useState } from "react";
import uuid from "react-uuid";

interface addNewSkillModalProps {
    setNewSkillOpen: (arg0: boolean) => void,
    whereIsSkills: 'teach' | "learn",
    setProfileState: (arg0: userInterface) => void,
    profileState: userInterface,
}

export default function AddNewSkillModal (props: addNewSkillModalProps) {
    const [newSkillsList, setNewSkillsList] = useState<ChoosedSkillInterface[]> (
        props.whereIsSkills === "learn" ? props.profileState.choosedLearningSkills
        : props.profileState.choosedTeachingSkills
    );
    const [skillsPropositions, setSkillsPropositions] = useState<SkillInterface[]> ([])
    const handleDeleteSkill = (skillToDeleteId: string) => {
        const mockSkills: ChoosedSkillInterface[] = [];
        if (props.whereIsSkills === 'learn') {
            props.profileState.choosedLearningSkills.map((skill) => {
                if (skill.id !== skillToDeleteId) {
                    mockSkills.push(skill)
                }
            })
        } else {
            props.profileState.choosedTeachingSkills.map((skill) => {
                if (skill.id !== skillToDeleteId) {
                    mockSkills.push(skill)
                }
            })
        }
        setNewSkillsList(mockSkills);
    }
    function handleDoneChoosing () {
        if (props.whereIsSkills === 'learn') {
            props.setProfileState({
                ...props.profileState,
                choosedLearningSkills: newSkillsList
            })
        } else {
            props.setProfileState({
                ...props.profileState,
                choosedTeachingSkills: newSkillsList
            })
        }
        props.setNewSkillOpen(false);
    }

    function handleCancel () {
        props.setNewSkillOpen(false);
    }

    function handleOnCategoryClick (categoryName: string) {
        //looking for skills with the specific category
        // const result = skillInterface[].where{categoryName ~= categoryName}
        // setSkillsPropositions(result)
    }

    function handleOnSearchInput (query: string) {
        //looking for skills with that category name or name
        // const result = skillInterface[].where{categoryName has query || name has query}
    }

    function handleOnSkillClick (skill: SkillInterface) {
        setNewSkillsList ([
            ...newSkillsList, 
            {
                id : uuid(),
                userId: props.profileState.id,
                skillItself: skill,
                state: props.whereIsSkills === "learn" ? "UserIsLearning" : "UserIsTeaching",
                proficiency: 'Unset'
            }
        ])
    }

    return <>
        <div className="w-full h-screen z-1 fixed flex top-0 left-0 py-10 px-5">
            <div className="m-auto bg-white p-5 rounded-xl space-y-5 w-full md:w-[80dvw] z-2 max-h-full overflow-auto">
                <div className="w-full flex justify-end">
                    <div className="cursor-pointer"
                    onClick={() => handleCancel()}
                    >
                        <X size={20}/>
                    </div>
                </div>
                <h3 className="text-center">Skills you may {props.whereIsSkills === "learn" ? "learn" : "teach"}</h3>
                {newSkillsList.length > 0 ? <div className="space-y-1">
                    <p className="text-black/70">Currently choosed skills :</p>
                    <div className="flex gap-2">
                        {newSkillsList.map((skill) => {
                            return <div className="relative" key={skill.id}>
                                <div className="filledStyle !inline-block !cursor-auto">
                                    {skill.skillItself.name}
                                </div>
                                <div 
                                onClick={() => handleDeleteSkill(skill.id)}
                                className="absolute -top-1 -right-1 cursor-pointer bg-red-200 rounded-[5px] p-0.5 text-red-700 border-red-500 hover:bg-red-300"
                                >
                                    <X size={12}/>
                                </div>
                            </div>
                        })}
                    </div>
                </div> : <p className="text-black/70">
                    Please, search and select skills.
                </p>}
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
                        onClick={() => handleDoneChoosing()}
                    >Done choosing</button>
                    <button 
                        className="hover:bg-blueDianne/20 bg-blueDianne/5 text-blueDianne"
                        onClick={() => handleCancel()}
                    >Cancel</button>
                </div>
            </div>
            <div className="w-full h-screen fixed top-0 left-0 bg-black/50"
                onClick={() => handleCancel()}
            ></div>
        </div>
    </>
}