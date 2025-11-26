'use client'
import { useGlobalStore } from "@/store/use-global-store";
import SkillChoosingMainContent from "@/src/components/skillChoosingComponents/skillChoosingMainContent";
import { useState } from "react";
import { ChoosedSkillType } from "@/src/types/skillsType";

export default function SkillsPage() {
    const { setWhereIsLoginRegisterPage, setNewToast, signupContentState, setSignupContentState } = useGlobalStore()
    const [whereIsSkills, setWhereIsSkills] = useState<"learn" | "teach"> ("learn");
    const [currentTeachSkillsList, setCurrentTeachSkillsList] = useState<ChoosedSkillType[]>(signupContentState.choosedTeachingSkills);
    const [currentLearnSkillsList, setCurrentLearnSkillsList] = useState<ChoosedSkillType[]>(signupContentState.choosedLearningSkills);
    const saveChanges = () => {
        setSignupContentState({
            ...signupContentState,
            choosedLearningSkills : whereIsSkills === "learn" ? currentLearnSkillsList : signupContentState.choosedLearningSkills,
            choosedTeachingSkills : whereIsSkills === "teach" ? currentTeachSkillsList : signupContentState.choosedTeachingSkills,
        });
    }
    return (<>
        <div className="space-y-8 w-full">
            <button className="filledButton" 
                onClick={() => (whereIsSkills === "learn") ? 
                    setWhereIsLoginRegisterPage("infos") : 
                    setWhereIsSkills("learn")}
            >Back</button>
            <div className='space-y-2 md:max-w-[70%] text-center mx-auto'>
               <h2>{whereIsSkills === "learn" ? "3" : "4"} - What are the skills you want to {(whereIsSkills === "learn") ? "learn" : "teach"} ?</h2>               
            </div>
            <div className="space-y-5">
                <SkillChoosingMainContent
                    whereIsSkills={(whereIsSkills === "learn") ? "learn" : "teach"}
                    setSkillsListState={(whereIsSkills ==="learn") ? setCurrentLearnSkillsList : setCurrentTeachSkillsList}
                    profileState={signupContentState}
                    currentSkillsListState={(whereIsSkills ==="learn") ? currentLearnSkillsList : currentTeachSkillsList}
                />
            </div>
            {(whereIsSkills === "learn") ? <>
                <button 
                    className={`filledButton w-full ${currentLearnSkillsList.length <= 0 ? "opacity-50" : ""}`}
                    onClick = {() => {
                        if (currentLearnSkillsList.length > 0) {
                            saveChanges();
                            setWhereIsSkills("teach");
                        } else {
                            setNewToast("error", "At least add One skill.")
                        }
                    }}
                >Done Choosing</button>
            </> : <>
                <button 
                    className={`filledButton w-full ${currentTeachSkillsList.length <= 0 ? "opacity-50" : ""}`}
                    onClick = {() => {
                        if (currentTeachSkillsList.length >= 1) {
                            // We should change to THE NEXT view
                            saveChanges();
                            setWhereIsLoginRegisterPage("skillsProficiency");
                        } else {
                            setNewToast("error", "At least add One skill.")
                        }
                    }}
                >Done Choosing</button>
            </>}
            
        </div>
    </>)
}