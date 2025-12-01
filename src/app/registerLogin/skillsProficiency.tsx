'use client';
import { useGlobalStore } from "@/store/use-global-store";
import { useState } from "react";
import { X } from 'lucide-react';
import uuid from 'react-uuid';
import {userType} from '@/src/types/userProfilesType';
import {ChoosedSkillType} from '@/src/types/skillsType';

export default function SkillsProficiency () {
    const { signupContentState, setSignupContentState, setNewToast, setWhereIsLoginRegisterPage } = useGlobalStore();
    const [activeLearnSkillIndex, setActiveLearnSkillIndex] = useState<number>(0)
    const [activeTeachSkillIndex, setActiveTeachSkillIndex] = useState<number>(0)
    const [whereIsSkills, setWhereIsSkills] = useState<'learn' | 'teach'> ('teach');
    const [profileState, setProfileState] = useState<userType>({...signupContentState});
    let checkIfSet: boolean = true;
    signupContentState.choosedLearningSkills.map((skill) => {
        if (skill.proficiency === 'Unset') {
            checkIfSet = false;
        }
    })
    signupContentState.choosedTeachingSkills.map((skill) => {
        if (skill.proficiency === 'Unset') {
            checkIfSet = false;
        }
    })
    const [isAllSet, setIsAllSet] = useState<boolean> (checkIfSet ? true : false);

    const handleChangeSkillProficiency = (
        newProficiency: "Advanced" | "Beginner" | "Intermediate", 
    ) => {
        let mockSkills: ChoosedSkillType[];
        let activeSkillIndex: number;
        const learnSkills = profileState.choosedLearningSkills;
        const teachSkills = profileState.choosedTeachingSkills;
        let mockCheckSkillsProficiency: {
            learn: ChoosedSkillType[],
            teach: ChoosedSkillType[]
        }
        let error: boolean = false;
        if (whereIsSkills === "learn") {
            mockSkills = [...learnSkills];
            activeSkillIndex = activeLearnSkillIndex;            
            mockSkills[activeSkillIndex] = {
                ...mockSkills[activeSkillIndex],
                proficiency: newProficiency
            };
            mockCheckSkillsProficiency = { 
                learn : mockSkills, 
                teach : teachSkills
            };
            setProfileState({...profileState, choosedLearningSkills : mockSkills})
        }
        else {
            mockSkills = [...teachSkills];
            activeSkillIndex = activeTeachSkillIndex;
            mockSkills[activeSkillIndex] = {
                ...mockSkills[activeSkillIndex],
                proficiency: newProficiency
            };
            mockCheckSkillsProficiency = { teach : mockSkills, learn : learnSkills};
            setProfileState({...profileState, choosedTeachingSkills : mockSkills})
        }
        mockCheckSkillsProficiency.learn.map((skill) => {
            if (skill.proficiency === 'Unset') {
                error = true;
            }
        })
        mockCheckSkillsProficiency.teach.map((skill) => {
            if (skill.proficiency === 'Unset') {
                error = true;
            }
        })
        if (error){ 
            setIsAllSet(false)
        } else {
            setIsAllSet(true)
        }
    }

    const handleSave = () => {
        const learnSkills = profileState.choosedLearningSkills;
        const teachSkills = profileState.choosedTeachingSkills;
        let error: boolean = false;
        learnSkills.map((skill) => {
            if (skill.proficiency === 'Unset') {
                error = true;
                setNewToast("error",`Please, set ${skill}(learn) proficiency.`);
            }
        })
        teachSkills.map((skill) => {
            if (skill.proficiency === 'Unset') {
                error = true;
                setNewToast("error", `Please, set ${skill}(teach) proficiency.`);
            }
        })
        if (!error) {
            // redirection
            setSignupContentState({ 
                ...profileState, 
                choosedLearningSkills: [...learnSkills],
                choosedTeachingSkills: [...teachSkills] 
            });
            setWhereIsLoginRegisterPage("profilePicture");
        }
    }

    return <div className="space-y-8">
    <button className="filledButton" 
        onClick={() => setWhereIsLoginRegisterPage("skills")}
    >Back</button>
    <div className='space-y-2 md:max-w-[70%] text-center mx-auto'>
        <h2>5 - How much do you know those skills ?</h2>               
    </div>
    <div className='space-y-2'>
        <p className="text-black/70"><span className='text-blue-500 font-medium'>Blue color</span> {`skills'level are still unset. Please,`} <span className='font-medium'>Change</span> them before saving.</p>
        <div className="flex gap-2">
            <button className={(whereIsSkills==='teach' ? "filledStyle" : "unfilledStyle")}
            onClick={() => setWhereIsSkills('teach')}                    
            >{`I can teach`}</button>
            <div className="w-[5px] h-[5px] bg-blueDianne/50 my-auto rounded-full"></div>
            <button className={(whereIsSkills==='learn' ? "filledStyle" : "unfilledStyle")}
            onClick={() => setWhereIsSkills('learn')}
            >I want to learn</button>
        </div>
        <div className="rounded-md border w-full border-blueDianne/50 p-5">
            <div className="space-y-4">
                {(whereIsSkills === 'learn') && <>
                    <div className='*:cursor-pointer *:border *:inline-block *:rounded-md flex gap-2'>
                        { profileState.choosedLearningSkills.length > 0 ? <>
                            {(profileState.choosedLearningSkills.map ((learnSkill, i) => {
                                let color: "yellow" | "green" | "red" | "blue";
                                if (learnSkill.proficiency === 'Beginner') {
                                    color = "green"
                                } else if (learnSkill.proficiency === 'Advanced') { 
                                    color = "red" 
                                } else if (learnSkill.proficiency === "Intermediate") { 
                                    color = "yellow"
                                } else { 
                                    color = "blue" 
                                }
                                return <div key={learnSkill.id}
                                    className={((activeLearnSkillIndex === i) ? ` outline-${color}-500 ` : " outline-transparent ") + ` relative outline-3 bg-${color}-200 border-${color}-300 text-${color}-700`}
                                >
                                    <button 
                                    onClick={() => setActiveLearnSkillIndex(i)}
                                    className='p-2'
                                    >
                                        {learnSkill.skillItself.name}
                                    </button>
                                </div>
                            }))}
                        </> : <></>}
                    </div>
                    <div className='space-y-2'>
                        {profileState.choosedLearningSkills.length > 0 ? <>
                            <p>How much do you know <span className="font-medium">{profileState.choosedLearningSkills[activeLearnSkillIndex].skillItself.name}</span> ?</p>
                            <div className="flex *:p-2 *:border gap-2 *:inline-block *:rounded-md *:cursor-pointer">
                                <div 
                                onClick={() => {
                                    if (profileState.choosedLearningSkills[activeLearnSkillIndex].proficiency !== "Advanced") {
                                        handleChangeSkillProficiency("Advanced");
                                    }
                                }}
                                className={(profileState.choosedLearningSkills[activeLearnSkillIndex].proficiency === "Advanced" ? " outline-red-500 " : " outline-transparent ") + ' outline-3 border-red-300 bg-red-200 text-red-700'}>Advanced</div>
                                <div 
                                onClick={() => {
                                    if (profileState.choosedLearningSkills[activeLearnSkillIndex].proficiency !== "Intermediate") {
                                        handleChangeSkillProficiency("Intermediate");
                                    }
                                }}
                                className={(profileState.choosedLearningSkills[activeLearnSkillIndex].proficiency === "Intermediate" ? "outline-yellow-500 " : " outline-transparent ") + ' outline-3 border-yellow-300 bg-yellow-200 text-yellow-700'}>
                                    Intermediate</div>
                                <div 
                                onClick={() => {
                                    if (profileState.choosedLearningSkills[activeLearnSkillIndex].proficiency !== "Beginner") {
                                        handleChangeSkillProficiency("Beginner");
                                    }
                                }}
                                className={(profileState.choosedLearningSkills[activeLearnSkillIndex].proficiency === "Beginner" ? "outline-green-500 " : " outline-transparent ") + ' outline-3 border-green-300 bg-green-200 text-green-700'}>
                                    Beginner
                                </div>
                            </div>
                        </> : <>
                            <p className='rounded-md w-full px-5 py-3 border-red-300 text-center text-red-700 bg-red-100'>Please, add at least one skill.</p>
                        </>}
                    </div>
                </>}
                {(whereIsSkills === 'teach') && <>
                    <div className='*:cursor-pointer *:border *:inline-block *:rounded-md flex gap-2'>
                        {profileState.choosedTeachingSkills.length > 0 ? <>
                            {(profileState.choosedTeachingSkills.map ((teachSkill, i) => {
                                let color: "yellow" | "green" | "red" | "blue";
                                if (teachSkill.proficiency === 'Beginner') {
                                    color = "green"
                                } else if (teachSkill.proficiency === 'Advanced') { 
                                    color = "red" 
                                } else if (teachSkill.proficiency === "Intermediate"){ 
                                    color = "yellow"
                                } else { color = "blue" }
                                return <div key={teachSkill.id}
                                className={((activeTeachSkillIndex === i) ? ` outline-${color}-500 ` : " outline-transparent ") + ` relative outline-3 bg-${color}-200 border-${color}-300 text-${color}-700`}
                                >
                                    <button
                                    onClick={() => setActiveTeachSkillIndex(i)}
                                    className='p-2'
                                    >
                                        {teachSkill.skillItself.name}
                                    </button>
                                </div>
                                
                            }))}
                        </> : <></>}
                    </div>
                    <div className='space-y-2'>
                        { profileState.choosedTeachingSkills.length > 0 ? <>
                            <p>Choose your actual level at <span className='font-medium'>{profileState.choosedTeachingSkills[activeTeachSkillIndex].skillItself.name}</span></p>
                            <div className="flex *:p-2 *:border gap-2 *:inline-block *:rounded-md *:cursor-pointer">
                                <div 
                                onClick={() => {
                                    if (profileState.choosedTeachingSkills[activeTeachSkillIndex].proficiency !== "Advanced") {
                                        handleChangeSkillProficiency("Advanced")                                
                                    }
                                }}
                                className={(profileState.choosedTeachingSkills[activeTeachSkillIndex].proficiency === "Advanced" ? " outline-red-500 " : " outline-transparent ") + ' outline-3 border-red-300 bg-red-200 text-red-700'}>Advanced</div>
                                <div 
                                onClick={() => {
                                    if (profileState.choosedTeachingSkills[activeTeachSkillIndex].proficiency !== "Intermediate") {
                                        handleChangeSkillProficiency("Intermediate")                                
                                    }
                                }}
                                className={(profileState.choosedTeachingSkills[activeTeachSkillIndex].proficiency === "Intermediate" ? " outline-yellow-500 " : " outline-transparent ") + ' outline-3 border-yellow-300 bg-yellow-200 text-yellow-700'}>Intermediate</div>
                                <div 
                                onClick={() => {
                                    if (profileState.choosedTeachingSkills[activeTeachSkillIndex].proficiency !== "Beginner") {
                                        handleChangeSkillProficiency("Beginner")                                
                                    }
                                }}
                                className={(profileState.choosedTeachingSkills[activeTeachSkillIndex].proficiency === "Beginner" ? " outline-green-500 " : " outline-transparent ") + ' outline-3 border-green-300 bg-green-200 text-green-700'}>Beginner</div>
                            </div>
                        </> : <>
                            <p className='rounded-md w-full px-5 py-3 border-red-300 text-center text-red-700 bg-red-100'>Please, add at least one skill.</p>
                        </>}
                    </div>
                </>}
            </div>
        </div>
    </div>
    <button 
        className={`filledButton w-full ${!isAllSet ? "opacity-50" : ""}`}
        onClick = {() => {
            if (isAllSet) {
                handleSave();
            } else {
                const learnSkills = profileState.choosedLearningSkills;
                const teachSkills = profileState.choosedTeachingSkills;
                learnSkills.map((skill) => {
                    if (skill.proficiency === 'Unset') {
                        setNewToast("error", `Please, set ${skill.skillItself.name} proficiency.`);
                    }
                })
                teachSkills.map((skill) => {
                    if (skill.proficiency === 'Unset') {
                        setNewToast("error", `Please, set ${skill.skillItself.name} proficiency.`);
                    }
                })
            }
        }}
    >Done Choosing</button>
    </div>
}