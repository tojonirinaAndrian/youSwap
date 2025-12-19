'use client';
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/use-global-store";
import { userType } from "@/src/types/userProfilesType";
import MatchCard from "../matchCard";
import { getMatchingProfiles } from "@/src/requests/matches";
import { ChoosedSkillType } from "@/src/types/skillsType";
import { X, Filter } from "lucide-react";

export default function Matches () {
    const [ page, setPage ] = useState<number>(0);
    const { userProfile, setNewToast } = useGlobalStore();
    const [ matchingProfiles, setMatchingProfiles ] = useState<userType[]>([]);
    const [choosedAvailability, setChoosedAvailability] = useState<"Both" | "InPerson" | "Online">(userProfile.availablility);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [choosedLearningSkills, setChoosedLearningSkills] = useState<ChoosedSkillType[]>([...userProfile.choosedLearningSkills])
    const [choosedTeachingSkills, setChoosedTeachingSkills] = useState<ChoosedSkillType[]>([...userProfile.choosedTeachingSkills]);
    const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
    useEffect(() => {
        const dataFetching = async () => {
            const choosedSkills = {
                choosedLearningSkills: [...choosedLearningSkills],
                choosedTeachingSkills: [...choosedTeachingSkills]
            }
            const profiles = await getMatchingProfiles(page, userProfile, choosedAvailability, choosedSkills);
            // console.log(profiles.length);
            // console.log(profiles);
            if (profiles !== "error" && profiles !== "userShouldChooseOneSkillAtLeast"){
                setMatchingProfiles(profiles);
            } else {
                setNewToast("error", "An error happened or no match found.");
                setMatchingProfiles([]);
            }
            setIsLoading(false);
        }
        dataFetching();
    }, [page, choosedAvailability, choosedLearningSkills, choosedTeachingSkills]);
    return <div className="space-y-2">
        <div className="relative space-y-2">
            {filtersOpen ? <>
                <div className="border border-blueDianne/10 *:my-auto sticky w-fit top-0 left-0 z-10 bg-white p-3 rounded-md flex flex-col gap-2">
                    <div className="w-full flex justify-between *:my-auto">
                        <p className="flex gap-1 p-1 font-medium *:my-auto"><Filter size={18}/>Filters</p>
                        <p className="p-1 rounded-md hover:bg-red-200 hover:text-red-700 cursor-pointer"
                        onClick={() => setFiltersOpen(false)}
                        ><X size={18}/></p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-black/70 my-auto">Your availability :</p>
                        <button className={`flex gap-1 ${choosedAvailability==='Both' ? `filledStyle` : `unfilledStyle`}`}
                        onClick={()=>{
                            setIsLoading(true);
                            setChoosedAvailability('Both');
                        }}
                        >Both</button>
                        <div className="w-[5px] h-[5px] bg-blueDianne/50 my-auto rounded-full"></div>
                        
                        <button className={`flex gap-1 ${choosedAvailability==='InPerson' ? `filledStyle` : `unfilledStyle`}`}
                        onClick={()=>{
                            setIsLoading(true);
                            setChoosedAvailability('InPerson');
                        }}
                        >In person</button>
                        <div className="w-[5px] h-[5px] bg-blueDianne/50 my-auto rounded-full"></div>

                        <button className={`flex gap-1 ${choosedAvailability==='Online' ? `filledStyle` : `unfilledStyle`}`}
                        onClick={()=>{
                            setIsLoading(true);
                            setChoosedAvailability('Online');
                        }}
                        >Online</button>
                        
                    </div>
                    <div className="flex gap-2">
                        <p className="text-black/70 my-auto">Your teaching skills :</p>
                        {(userProfile.choosedTeachingSkills.map((choosedSkill, i) => {
                            return <div className="space-y-1 flex gap-2" key={choosedSkill.id}>
                                <button className={`${choosedTeachingSkills.includes(choosedSkill) ? ` filledStyle ` : ` unfilledStyle `} !inline-block`}
                                onClick={()=>{
                                    if(!choosedTeachingSkills.includes(choosedSkill)) {
                                        setIsLoading(true);
                                        const mock: ChoosedSkillType[] = [...choosedTeachingSkills];
                                        mock.push(choosedSkill);
                                        setChoosedTeachingSkills(mock);
                                    } else {
                                        setIsLoading(true);
                                        const mock: ChoosedSkillType[] = [];
                                        for (let i = 0; i < choosedTeachingSkills.length; i++) {
                                            if (choosedTeachingSkills[i].id !== choosedSkill.id) {
                                                mock.push(choosedTeachingSkills[i]);
                                            } else { continue }
                                        }
                                        setChoosedTeachingSkills(mock);
                                    }
                                }}
                                >{choosedSkill.skillItself.name}</button>
                                {(userProfile.choosedTeachingSkills.length > 1 && i !== userProfile.choosedTeachingSkills.length - 1) && <div className="w-[5px] h-[5px] bg-blueDianne/50 my-auto rounded-full"></div>}   
                            </div>
                        }))}
                    </div>
                    <div className="flex gap-2">
                        <p className="text-black/70 my-auto">Your learning skills :</p>
                        {(userProfile.choosedLearningSkills.map((choosedSkill, i) => {
                            return <div className="space-y-1 flex gap-2" key={choosedSkill.id}>
                                <button className={`!inline-block ${choosedLearningSkills.includes(choosedSkill) ? ` filledStyle ` : ` unfilledStyle `}`}
                                onClick={()=>{
                                    if(!choosedLearningSkills.includes(choosedSkill)) {
                                        setIsLoading(true);
                                        const mock = [...choosedLearningSkills];
                                        mock.push(choosedSkill);
                                        setChoosedLearningSkills(mock);
                                    } else {
                                        const mock: ChoosedSkillType[] = [];
                                        for (let i = 0; i < choosedLearningSkills.length; i++) {
                                            if (choosedLearningSkills[i].id !== choosedSkill.id) {
                                                mock.push(choosedLearningSkills[i]);
                                            } else { continue }
                                        }
                                        setChoosedLearningSkills(mock);
                                    }
                                }}
                                >{choosedSkill.skillItself.name}</button>
                                { (userProfile.choosedLearningSkills.length > 1 && i !== userProfile.choosedLearningSkills.length - 1) && <div className="w-[5px] h-[5px] bg-blueDianne/50 my-auto rounded-full"></div> }   
                            </div>
                        }))}
                    </div>
                </div>    
            </> : <>
                <div 
                onClick={() => setFiltersOpen(true)}
                className="border cursor-pointer border-blueDianne/10 *:my-auto sticky w-fit top-0 left-0 z-10 bg-white p-3 rounded-md">
                    <p className="flex gap-1 p-1 font-medium *:my-auto"><Filter size={18}/>Filters</p>
                </div>
            </>}
            
            <div className="">
                {(!loading) ? <div className="grid grid-cols-2 gap-2">
                    {(matchingProfiles && matchingProfiles.length > 0) ? matchingProfiles.map((match) => {
                        return <MatchCard user={match} key={match.id}/>
                    }) : <>No matches</>}
                </div> : <div className="flex *:m-auto w-full h-full">
                    <h3 className="font-semibold uppercase opacity-50">Loading...</h3>
                </div>}
            </div>
        </div>
        {(!loading) && <div className="w-full flex justify-center p-3">
            <button className="filledButton"
            onClick={() => {
                setIsLoading(true);
                setPage(page + 1);
            }}>
                See more
            </button>
        </div>}
    </div>
}