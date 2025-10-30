'use client';
import { useState } from 'react';
import profileInterface from '@/src/types/userProfilesType';
import { X, Plus, Trash } from 'lucide-react';
import AddNewSkillModal from './addNewSkillModal';
import { useGlobalStore } from '@/store/use-global-store';
import skillInterface from '@/src/types/skillsType';
import uuid from 'react-uuid';

export default function ModifyProfile (props: {
    setWhereIsProfile: (arg0: 'view' | 'modify') => void,
}) {
    const { userProfile, setUserProfile } = useGlobalStore();
    const [activeLearnSkillIndex, setActiveLearnSkillIndex] = useState<number>(0)
    const [activeTeachSkillIndex, setActiveTeachSkillIndex] = useState<number>(0)
    const [whereIsSkills, setWhereIsSkills] = useState<'learn' | 'teach'> ('teach');
    const [profileState, setProfileState] = useState<profileInterface>(userProfile);
    const [newSkillModalOpen, setNewSkillModalOpen] = useState<boolean>(false);
    const handleSave = ():void => {
        // savingStuff: saving the profileState to the actual database then the View would call its specific id...
        setUserProfile(profileState);
        props.setWhereIsProfile('view');
    }
    const handleDeleteSkill = (skillToDeleteId: string) => {
        const mockSkills: skillInterface[] = [];
        if (whereIsSkills === 'learn') {
            profileState.skills.learnSkills.map((skill) => {
                if (skill.skillId !== skillToDeleteId) {
                    mockSkills.push(skill)
                }
            })
            setProfileState({
                ...profileState,
                skills : {
                    teachSkills : profileState.skills.teachSkills,
                    learnSkills : mockSkills
                }
            })
        } else {
            profileState.skills.teachSkills.map((skill) => {
                if (skill.skillId !== skillToDeleteId) {
                    mockSkills.push(skill)
                }
            })
            setProfileState({
                ...profileState,
                skills : {
                    learnSkills : profileState.skills.learnSkills,
                    teachSkills : mockSkills
                }
            })
        }
    }
    return <>
        <div className="gap-2 flex flex-col h-full overflow-auto">
            <div className='space-y-10'>
                <div className='space-y-2'>
                    <div className='flex gap-5'>
                        <div className="w-40 h-40 bg-slate-500 rounded-full flex">
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
                        defaultValue={profileState.description}
                        onChange={(e) => setProfileState({
                            ...profileState,
                            description: e.target.value
                        })}
                        className="rounded-md not-focus:text-black/80 text-xl w-full p-3 border " placeholder='Your description'/>
                        {/* <p className='ml-auto italic text-blueDianne'>~ {profileState.pseudo} ~</p> */}
                    </div>
                </div>
                <div className='space-y-2'>
                    <div className='space-y-0.5'>
                        <h3 className='text-blueDianne'>Skills</h3>
                        <p className="text-black/70">Choose from <span className='font-medium'>1 to 5</span> skills each for both teaching and learning.</p>
                        <p className='text-black/70'><span className='text-blue-500 font-medium'>Blue color</span> skills'level are still unset. Please, <span className='font-medium'>Change</span> them before saving.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className={(whereIsSkills==='teach' ? "filledStyle" : "borderedStyle")}
                        onClick={() => setWhereIsSkills('teach')}                    
                        >{`I can teach`}</button>
                        <div className="w-[5px] h-[5px] bg-blueDianne/50 my-auto rounded-full"></div>
                        <button className={(whereIsSkills==='learn' ? "filledStyle" : "borderedStyle")}
                        onClick={() => setWhereIsSkills('learn')}
                        >I want to learn</button>
                    </div>
                    <div className="rounded-md border w-full border-blueDianne/50 p-5">
                        <div className="space-y-4">
                            {(whereIsSkills === 'learn') && <>
                                {newSkillModalOpen && <AddNewSkillModal setProfileState={setProfileState} profileState={profileState} whereIsSkills='learn' setNewSkillOpen={setNewSkillModalOpen}/>}
                                <div className='*:cursor-pointer *:border *:inline-block *:rounded-md flex gap-2'>
                                    { profileState.skills.learnSkills.length > 0 ? <>
                                        {(profileState.skills.learnSkills.map ((learnSkill, i) => {
                                            let color: "yellow" | "green" | "red" | "blue";
                                            if (learnSkill.level === 'beginner') {
                                                color = "green"
                                            } else if (learnSkill.level === 'advanced') { 
                                                color = "red" 
                                            } else if (learnSkill.level === "intermediate") { 
                                                color = "yellow"
                                            } else { color = "blue" }
                                            return <div key={learnSkill.skillId}
                                                className={((activeLearnSkillIndex === i) ? ` outline-${color}-500 ` : " outline-transparent ") + ` relative outline-3 bg-${color}-200 border-${color}-300 text-${color}-700`}
                                            >
                                                <button 
                                                onClick={() => setActiveLearnSkillIndex(i)}
                                                className='p-2'
                                                >
                                                    {learnSkill.name}
                                                </button>
                                                <div 
                                                onClick={() => handleDeleteSkill(learnSkill.skillId)}
                                                className="absolute border border-amber-300 -top-2 -right-1 cursor-pointer bg-amber-100 rounded-[5px] p-0.5 text-amber-700 hover:bg-amber-200"
                                                >
                                                    <X size={12}/>
                                                </div>
                                            </div>
                                        }))}
                                    </> : <></>}
                                    {(profileState.skills.learnSkills.length < 5) && <>
                                        <button
                                            onClick={() => {
                                                setNewSkillModalOpen (true)
                                            }}
                                            className='hover:bg-blueDianne/25 p-2 hover:text-blueDianne text-blueDianne/70 cursor-pointer bg-blueDianne/10 '><Plus /></button>
                                    </>}
                                </div>
                                <div className='space-y-2'>
                                    {profileState.skills.learnSkills.length > 0 ? <>
                                        <p>How much do you know <span className="font-medium">{profileState.skills.learnSkills[activeLearnSkillIndex].name}</span> ?</p>
                                        <div className="flex *:p-2 *:border gap-2 *:inline-block *:rounded-md *:cursor-pointer">
                                            <div 
                                            onClick={() => {
                                                if (profileState.skills.learnSkills[activeLearnSkillIndex].level !== "advanced") {
                                                    const mock = profileState.skills.learnSkills;
                                                    mock[activeLearnSkillIndex].level = 'advanced';
                                                    setProfileState({
                                                        ...profileState,
                                                        skills : {
                                                            ...profileState.skills,
                                                            learnSkills : mock
                                                        }
                                                    })
                                                }
                                            }}
                                            className={(profileState.skills.learnSkills[activeLearnSkillIndex].level === "advanced" ? " outline-red-500 " : " outline-transparent ") + ' outline-3 border-red-300 bg-red-200 text-red-700'}>Advanced</div>
                                            <div 
                                            onClick={() => {
                                                if (profileState.skills.learnSkills[activeLearnSkillIndex].level !== "intermediate") {
                                                    const mock = profileState.skills.learnSkills;
                                                    mock[activeLearnSkillIndex].level = 'intermediate';
                                                    setProfileState({
                                                        ...profileState,
                                                        skills : {
                                                            ...profileState.skills,
                                                            learnSkills : mock
                                                        }
                                                    })
                                                }
                                            }}
                                            className={(profileState.skills.learnSkills[activeLearnSkillIndex].level === "intermediate" ? "outline-yellow-500 " : " outline-transparent ") + ' outline-3 border-yellow-300 bg-yellow-200 text-yellow-700'}>Intermediate</div>
                                            <div 
                                            onClick={() => {
                                                if (profileState.skills.learnSkills[activeLearnSkillIndex].level !== "beginner") {
                                                    const mock = profileState.skills.learnSkills;
                                                    mock[activeLearnSkillIndex].level = 'beginner';
                                                    setProfileState({
                                                        ...profileState,
                                                        skills : {
                                                            ...profileState.skills,
                                                            learnSkills : mock
                                                        }
                                                    })
                                                }
                                            }}
                                            className={(profileState.skills.learnSkills[activeLearnSkillIndex].level === "beginner" ? "outline-green-500 " : " outline-transparent ") + ' outline-3 border-green-300 bg-green-200 text-green-700'}>Beginner</div>
                                        </div>
                                    </> : <>
                                        <p className='rounded-md w-full px-5 py-3 border-red-300 text-center text-red-700 bg-red-100'>Please, add at least one skill.</p>
                                    </>}
                                </div>
                            </>}
                            {(whereIsSkills === 'teach') && <>
                                {newSkillModalOpen && <AddNewSkillModal setProfileState={setProfileState} profileState={profileState} whereIsSkills='teach' setNewSkillOpen={setNewSkillModalOpen}/>}
                                <div className='*:cursor-pointer *:border *:inline-block *:rounded-md flex gap-2'>
                                    {profileState.skills.teachSkills.length > 0 ? <>
                                        {(profileState.skills.teachSkills.map ((teachSkill, i) => {
                                            let color: "yellow" | "green" | "red" | "blue";
                                            if (teachSkill.level === 'beginner') {
                                                color = "green"
                                            } else if (teachSkill.level === 'advanced') { 
                                                color = "red" 
                                            } else if (teachSkill.level === "intermediate"){ 
                                                color = "yellow"
                                            } else { color = "blue" }
                                            return <div key={teachSkill.skillId}
                                            className={((activeTeachSkillIndex === i) ? ` outline-${color}-500 ` : " outline-transparent ") + ` relative outline-3 bg-${color}-200 border-${color}-300 text-${color}-700`}
                                            >
                                                <button
                                                onClick={() => setActiveTeachSkillIndex(i)}
                                                className='p-2'
                                                >
                                                    {teachSkill.name}
                                                </button>
                                                <div 
                                                onClick={() => handleDeleteSkill(teachSkill.skillId)}
                                                className="absolute border border-amber-300 -top-2 -right-1 cursor-pointer bg-amber-100 rounded-[5px] p-0.5 text-amber-700 hover:bg-amber-200"
                                                >
                                                    <X size={12}/>
                                                </div>
                                            </div>
                                            
                                        }))}
                                    </> : <></>}
                                    {(profileState.skills.teachSkills.length < 5) && <>
                                        <button 
                                            onClick={() => setNewSkillModalOpen (true)}
                                            className='text-blueDianne/70 p-2 hover:bg-blueDianne/25 hover:text-blueDianne cursor-pointer bg-blueDianne/10'><Plus /></button>
                                    </>}
                                </div>
                                <div className='space-y-2'>
                                    { profileState.skills.teachSkills.length > 0 ? <>
                                        <p>Choose your actual level at <span className='font-medium'>{profileState.skills.teachSkills[activeTeachSkillIndex].name}</span></p>
                                        <div className="flex *:p-2 *:border gap-2 *:inline-block *:rounded-md *:cursor-pointer">
                                            <div 
                                            onClick={() => {
                                                if (profileState.skills.teachSkills[activeTeachSkillIndex].level !== "advanced") {
                                                    const mock = profileState.skills.teachSkills;
                                                    mock[activeTeachSkillIndex].level = 'advanced';
                                                    setProfileState({
                                                        ...profileState,
                                                        skills : {
                                                            ...profileState.skills,
                                                            teachSkills : mock
                                                        }
                                                    })
                                                }
                                            }}
                                            className={(profileState.skills.teachSkills[activeTeachSkillIndex].level === "advanced" ? " outline-red-500 " : " outline-transparent ") + ' outline-3 border-red-300 bg-red-200 text-red-700'}>Advanced</div>
                                            <div 
                                            onClick={() => {
                                                if (profileState.skills.teachSkills[activeTeachSkillIndex].level !== "intermediate") {
                                                    const mock = profileState.skills.teachSkills;
                                                    mock[activeTeachSkillIndex].level = 'intermediate';
                                                    setProfileState({
                                                        ...profileState,
                                                        skills : {
                                                            ...profileState.skills,
                                                            teachSkills : mock
                                                        }
                                                    })
                                                }
                                            }}
                                            className={(profileState.skills.teachSkills[activeTeachSkillIndex].level === "intermediate" ? " outline-yellow-500 " : " outline-transparent ") + ' outline-3 border-yellow-300 bg-yellow-200 text-yellow-700'}>Intermediate</div>
                                            <div 
                                            onClick={() => {
                                                if (profileState.skills.teachSkills[activeTeachSkillIndex].level !== "beginner") {
                                                    const mock = profileState.skills.teachSkills;
                                                    mock[activeTeachSkillIndex].level = 'beginner';
                                                    setProfileState({
                                                        ...profileState,
                                                        skills : {
                                                            ...profileState.skills,
                                                            teachSkills : mock
                                                        }
                                                    })
                                                }
                                            }}
                                            className={(profileState.skills.teachSkills[activeTeachSkillIndex].level === "beginner" ? " outline-green-500 " : " outline-transparent ") + ' outline-3 border-green-300 bg-green-200 text-green-700'}>Beginner</div>
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
                    {(profileState.portfolioVideoLink === "") && <div className='hover:bg-blueDianne/25 hover:text-blueDianne w-[400px] h-[200px] text-blueDianne/70 cursor-pointer rounded-md bg-blueDianne/10  border'>
                        <div className='flex w-full h-full'>
                            <div className="m-auto">
                                <Plus size={32} className='m-auto'/>
                                Add a video
                            </div>   
                        </div>
                    </div>}
                    <p>Links : </p>
                    {(profileState.portfolioLinks.map((link) => {
                        return <div className="flex gap-2" key={link.linkId}>
                            <input type="text" placeholder='Link label' defaultValue={link.label} className='not-focus:text-black/80 border-black/50 px-3 py-2 border-1 rounded-md'/>
                            <p className='m-auto'>:</p> 
                            <input type='text' placeholder='Link address' defaultValue={link.link}
                            className='not-focus:text-black/80 border-black/50 px-3 py-2 border-1 rounded-md w-full'
                            />
                            <button className='bg-red-100 flex gap-2 hover:bg-red-200 text-red-700 p-2 rounded-md items-center cursor-pointer'
                            onClick={() => {
                                const mock: {link: string,label: string, linkId: string}[] = [];
                                profileState.portfolioLinks.map (mockLink => {
                                    if (mockLink.linkId !== link.linkId) {
                                        mock.push(mockLink)
                                    }
                                });
                                setProfileState ({
                                    ...profileState,
                                    portfolioLinks: mock
                                })
                            }}
                            ><Trash size={18}/>Delete</button>
                        </div>
                    }))}
                    {(profileState.portfolioLinks.length < 5) && <>
                        <div 
                            onClick={() => {
                                const mock = profileState.portfolioLinks;
                                const newUuid = uuid();
                                mock.push({
                                    label: "", link: "", linkId: newUuid
                                })
                                setProfileState({
                                    ...profileState, portfolioLinks: mock
                                })
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