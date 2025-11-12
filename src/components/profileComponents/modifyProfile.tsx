'use client';
import { useState } from 'react';
import { X, Plus, Trash, User } from 'lucide-react';
import AddNewSkillModal from './addNewSkillModal';
import { useGlobalStore } from '@/store/use-global-store';
import uuid from 'react-uuid';
import userInterface from '@/src/types/userProfilesType';
import ChoosedSkillInterface from '@/src/types/skillsType';

export default function ModifyProfile (props: {
    setWhereIsProfile: (arg0: 'view' | 'modify') => void,
}) {
    const { userProfile, setUserProfile } = useGlobalStore();
    const [activeLearnSkillIndex, setActiveLearnSkillIndex] = useState<number>(0)
    const [activeTeachSkillIndex, setActiveTeachSkillIndex] = useState<number>(0)
    const [whereIsSkills, setWhereIsSkills] = useState<'learn' | 'teach'> ('teach');
    const [profileState, setProfileState] = useState<userInterface>({...userProfile});
    const [newSkillModalOpen, setNewSkillModalOpen] = useState<boolean>(false);
    const handleSave = (): void => {
        // savingStuff: saving the profileState to the actual database then the View would call its specific id...
        setUserProfile(profileState);
        props.setWhereIsProfile('view');
    }
    const handleDeletePortfolioLink = (linkId: string) => {
        const mock: {link: string,label: string, id: string}[] = [];
        profileState.portfolioLinks.map (mockLink => {
            if (mockLink.id !== linkId) {
                mock.push(mockLink)
            }
        });
        setProfileState ({
            ...profileState,
            portfolioLinks: mock
        })
    }
    const handleAddPortfolioLink = () => {
        const mockLinks: {
            id: string,
            label: string, link: string
        }[] = [ ...profileState.portfolioLinks ];
        const newUuid: string = uuid();
        mockLinks.push({
            label: "", link: "", id: newUuid
        })
        setProfileState({
            ...profileState,
            portfolioLinks: mockLinks
        })
    }
    const handleDeleteSkill = (skillToDeleteId: string) => {
        const mockSkills: ChoosedSkillInterface[] = [];
        if (whereIsSkills === 'learn') {
            profileState.choosedLearningSkills.map((skill) => {
                if (skill.id !== skillToDeleteId) {
                    mockSkills.push(skill)
                }
            })
            setProfileState({
                ...profileState,
                choosedLearningSkills: mockSkills
            })
        } else {
            profileState.choosedTeachingSkills.map((skill) => {
                if (skill.id !== skillToDeleteId) {
                    mockSkills.push(skill)
                }
            })
            setProfileState({
                ...profileState,
                choosedTeachingSkills: mockSkills
            })
        }
    }
    const handleChangeSkillProficiency = (
        newProficiency: "Advanced" | "Beginner" | "Intermediate", 
    ) => {
        let mockSkills: ChoosedSkillInterface[]
        let activeSkillIndex: number
        if (whereIsSkills === "learn") {
            mockSkills = [...profileState.choosedLearningSkills];
            activeSkillIndex = activeLearnSkillIndex;            
            mockSkills[activeSkillIndex] = {
                ...mockSkills[activeSkillIndex],
                proficiency: newProficiency
            };
            setProfileState({...profileState, choosedLearningSkills : mockSkills})
        }
        else {
            mockSkills = [...profileState.choosedTeachingSkills];
            activeSkillIndex = activeTeachSkillIndex;
            mockSkills[activeSkillIndex] = {
                ...mockSkills[activeSkillIndex],
                proficiency: newProficiency
            };
            setProfileState({...profileState, choosedTeachingSkills : mockSkills})
        }
    }
    return <>
        <div className="flex justify-between">
            <div className="flex gap-2 my-auto">
                <User /><h3>Profile</h3>
            </div>
            <div>
                <div className="flex gap-2">
                    <button className="filledButton"
                    onClick={() => {
                        handleSave();
                    }}
                    >
                        Save changes
                    </button>
                    <button className="borderedButton"
                    onClick={() => {
                        props.setWhereIsProfile('view')
                    }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div className="gap-2 flex flex-col h-full overflow-auto">
            <div className='space-y-10'>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-5 mx-auto'>
                        <div className="w-40 h-40 bg-slate-500 rounded-full flex cursor-pointer">
                            <div className='m-auto flex flex-col text-white max-w-2/3 text-center'>
                                <Plus size={32} className='mx-auto'/>
                                <p>Add a profile picture</p>
                            </div>
                        </div>
                        <div className='space-y-2 my-auto'>
                            <div className=''>
                                <label htmlFor="name" className='text-black/70'>Full name</label>
                                <input type="text" name='name' placeholder="Your full name" className='not-focus:text-black/80 border-black/50 px-3 py-2 border-1 rounded-md w-full'
                                defaultValue={profileState.fullName} 
                                onChange={(e) => setProfileState({
                                    ...profileState,
                                    fullName: e.target.value
                                })}
                                />
                            </div>
                            <div className=''>
                                <label htmlFor="pseudo" className='text-black/70'>Pseudo</label>
                                <input type="text" name='psuedo' placeholder="Your pseudo" className='not-focus:text-black/80 px-3 py-2 border-1 border-black/50 rounded-md w-full'
                                defaultValue={profileState.pseudo} 
                                onChange={(e) => setProfileState({
                                    ...profileState,
                                    pseudo: e.target.value
                                })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className='space-y-0.5'>
                        <h3 className='text-blueDianne'>Personal description</h3>
                        <p className="text-black/70">Few sentences to describe yourself.</p>
                    </div>
                    <div className='space-y-1 flex flex-col'>
                        <textarea 
                        defaultValue={profileState.profileDescription}
                        onChange={(e) => setProfileState({
                            ...profileState,
                            profileDescription: e.target.value
                        })}
                        className="rounded-md not-focus:text-black/80 text-xl w-full p-3 border " placeholder='Your description'/>
                        {/* <p className='ml-auto italic text-blueDianne'>~ {profileState.pseudo} ~</p> */}
                    </div>
                </div>
                <div className='space-y-2'>
                    <div className='space-y-0.5'>
                        <h3 className='text-blueDianne'>Skills</h3>
                        <p className="text-black/70">Choose from <span className='font-medium'>1 to 5</span> skills each for both teaching and learning.</p>
                        <p className="text-black/70"><span className='text-blue-500 font-medium'>Blue color</span> {`skills'level are still unset. Please,`} <span className='font-medium'>Change</span> them before saving.</p>
                    </div>
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
                                {newSkillModalOpen && <AddNewSkillModal setProfileState={setProfileState} profileState={profileState} whereIsSkills='learn' setNewSkillOpen={setNewSkillModalOpen}/>}
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
                                            } else { color = "blue" }
                                            return <div key={learnSkill.id}
                                                className={((activeLearnSkillIndex === i) ? ` outline-${color}-500 ` : " outline-transparent ") + ` relative outline-3 bg-${color}-200 border-${color}-300 text-${color}-700`}
                                            >
                                                <button 
                                                onClick={() => setActiveLearnSkillIndex(i)}
                                                className='p-2'
                                                >
                                                    {learnSkill.skillItself.name}
                                                </button>
                                                <div 
                                                onClick={() => handleDeleteSkill(learnSkill.id)}
                                                className="absolute border border-amber-300 -top-2 -right-1 cursor-pointer bg-amber-100 rounded-[5px] p-0.5 text-amber-700 hover:bg-amber-200"
                                                >
                                                    <X size={12}/>
                                                </div>
                                            </div>
                                        }))}
                                    </> : <></>}
                                    {(profileState.choosedLearningSkills.length < 5) && <>
                                        <button
                                            onClick={() => {
                                                setNewSkillModalOpen (true)
                                            }}
                                            className='hover:bg-blueDianne/25 p-2 hover:text-blueDianne text-blueDianne/70 cursor-pointer bg-blueDianne/10 '><Plus /></button>
                                    </>}
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
                                {newSkillModalOpen && <AddNewSkillModal setProfileState={setProfileState} profileState={profileState} whereIsSkills='teach' setNewSkillOpen={setNewSkillModalOpen}/>}
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
                                                <div 
                                                onClick={() => handleDeleteSkill(teachSkill.id)}
                                                className="absolute border border-amber-300 -top-2 -right-1 cursor-pointer bg-amber-100 rounded-[5px] p-0.5 text-amber-700 hover:bg-amber-200"
                                                >
                                                    <X size={12}/>
                                                </div>
                                            </div>
                                            
                                        }))}
                                    </> : <></>}
                                    {(profileState.choosedTeachingSkills.length < 5) && <>
                                        <button 
                                            onClick={() => setNewSkillModalOpen (true)}
                                            className='text-blueDianne/70 p-2 hover:bg-blueDianne/25 hover:text-blueDianne cursor-pointer bg-blueDianne/10'><Plus /></button>
                                    </>}
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
                <div className="space-y-2">
                    <div className='space-y-0.5'>
                        <h3 className='text-blueDianne'>Pictures</h3>
                        <p className="text-black/70">You can only put 5 pictures at most.</p>
                    </div>
                    <div className="space-x-1 *:inline-block *:rounded-md">
                        <div className="w-[200px] h-[200px] bg-blue-200"></div>
                        <div className="w-[200px] h-[200px] bg-red-200"></div>
                        <div className="w-[200px] h-[200px] bg-yellow-200"></div>
                        {(profileState.pictures.length < 5) && <div className='hover:bg-blueDianne/25 hover:text-blueDianne !block w-[200px] h-[200px] text-blueDianne/70 cursor-pointer bg-blueDianne/10  border'>
                            <div className='flex w-full h-full'>
                                <div className="m-auto">
                                    <Plus size={32} className='m-auto'/>
                                    Add a picture
                                </div>   
                            </div>
                        </div>}
                    </div>
                </div>
                <div className='space-y-2'>
                    <div className='space-y-0.5'>
                        <h3 className='text-blueDianne'>Portfolio</h3>
                        <p className="text-black/70">You can add a video of you performing here. Also, you can add the links to your personnals.</p>
                    </div>
                    {(profileState.portfolioVideo === "") && <div className='hover:bg-blueDianne/25 hover:text-blueDianne w-[400px] h-[200px] text-blueDianne/70 cursor-pointer rounded-md bg-blueDianne/10  border'>
                        <div className='flex w-full h-full'>
                            <div className="m-auto">
                                <Plus size={32} className='m-auto'/>
                                Add a video
                            </div>   
                        </div>
                    </div>}
                    <p>Links : </p>
                    {(profileState.portfolioLinks.map((link) => {
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
                    {(profileState.portfolioLinks.length < 5) && <>
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
                <button className="filledButton w-full" 
                onClick={() => handleSave()}
                >
                    Save changes
                </button>
            </div>
        </div>
        
    </>   
}