'use client';
import {ChoosedSkillType} from "@/src/types/skillsType";
import { SkillType } from "@/src/types/skillsType";
import {userType} from "@/src/types/userProfilesType";
import { X, Search} from "lucide-react";
import { useState } from "react";
import uuid from "react-uuid";
import SkillChoosingMainContent from "./skillChoosingMainContent";

interface addNewSkillModalProps {
    setNewSkillOpen: (arg0: boolean) => void,
    whereIsSkills: 'teach' | "learn",
    setProfileState: (arg0: userType) => void,
    profileState: userType,
}

export default function AddNewSkillModal (props: addNewSkillModalProps) {
    const [newSkillsList, setNewSkillsList] = useState<ChoosedSkillType[]> (
        props.whereIsSkills === "learn" ? props.profileState.choosedLearningSkills
        : props.profileState.choosedTeachingSkills
    );
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

    return <>
        <div className="w-full h-screen z-1 fixed flex top-0 left-0 py-10 px-5">
            <div className="m-auto bg-white p-5 rounded-xl space-y-5 w-full md:w-[80dvw] z-2 max-h-full overflow-auto">
                <div className="w-full flex justify-end">
                    <div className="cursor-pointer hover:bg-red-200 hover:text-red-500 p-1 rounded-md"
                    onClick={() => handleCancel()}
                    >
                        <X size={20}/>
                    </div>
                </div>
                <h3 className="text-center">Skills you may {props.whereIsSkills === "learn" ? "learn" : "teach"}</h3>
                <SkillChoosingMainContent 
                    whereIsSkills={props.whereIsSkills} 
                    setSkillsListState={setNewSkillsList}
                    profileState={props.profileState}
                    currentSkillsListState={newSkillsList}
                />
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