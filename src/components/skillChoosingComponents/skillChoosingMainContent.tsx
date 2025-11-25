'use client';
import { getSkillsByCategory } from "@/src/requests/skills";
import {ChoosedSkillType} from "@/src/types/skillsType";
import { SkillType } from "@/src/types/skillsType";
import {userType} from "@/src/types/userProfilesType";
import { X, Search} from "lucide-react";
import { useState, useEffect } from "react";
import uuid from "react-uuid";

interface addNewSkillModalProps {
    whereIsSkills: 'teach' | "learn",
    setSkillsListState: (arg0: ChoosedSkillType[]) => void,
    profileState: userType,
    currentSkillsListState: ChoosedSkillType[]
}

export default function SkillChoosingMainContent (props: addNewSkillModalProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    const categoriesToChooseFrom: string[] = [
        "Art", "Coding", "Sport", "SelfDevelopment"
    ];

    const [skillsPropositions, setSkillsPropositions] = useState<SkillType[]> ([]);

    useEffect(() => {
        console.log(selectedCategories);
        if (selectedCategories.length > 0) {
            handleOnCategoryClick (selectedCategories);
        } else {
            setSkillsPropositions([])
        }
    }, [selectedCategories])

    const handleDeleteChoosedSkill = (currentlyChoosedSkillToDeleteInRawForm: SkillType) => {
        const mockSkills: ChoosedSkillType[] = [];
        props.currentSkillsListState.map((currentListItem) => {
            if (currentListItem.skillItself.id === currentlyChoosedSkillToDeleteInRawForm.id) {
            } else {
                mockSkills.push(currentListItem)
            }
        })
        props.setSkillsListState(mockSkills);
    }

    function handleSelectSkill (skillToAdd: SkillType) {
        const mockSkills: ChoosedSkillType[] = [...props.currentSkillsListState];
        mockSkills.push({
            id: uuid(),
            skillItself: skillToAdd,
            state: props.whereIsSkills === "learn" ? "UserIsLearning" : "UserIsTeaching",
            proficiency: "Unset",
            userId: props.profileState.id
        })
        props.setSkillsListState(mockSkills);
    }

    async function handleOnCategoryClick (categoryNames: string[]) {
        //looking for skills with the specific category
        // const result = skillType[].where{categoryName ~= categoryName}
        // setSkillsPropositions(result)
        const relatedSkills: SkillType[] = await getSkillsByCategory(categoryNames);
        if (relatedSkills) console.log(relatedSkills);
        setSkillsPropositions(relatedSkills);
    }


    function handleOnSearchInput (query: string) {
        //looking for skills with that category name or name
        // const result = skillType[].where{categoryName has query || name has query}
    }

    return <>
        {props.currentSkillsListState.length > 0 ? <div className="space-y-1">
            <p className="text-black/70">Currently choosed skills :</p>
            <div className="flex gap-2">
                {props.currentSkillsListState.map((skill) => {
                    return <div className="relative" key={skill.id}>
                        <div className="filledStyle !inline-block !cursor-auto">
                            {skill.skillItself.name}
                        </div>
                        <div 
                        onClick={() => handleDeleteChoosedSkill(skill.skillItself)}
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
        {(props.currentSkillsListState.length < 5) ? <>
            <div className="space-y-1">
                <div>Select categories you wish to look from : </div>
                <div className="*:inline-block space-x-2 space-y-2">
                    {categoriesToChooseFrom.map((category: string, i: number) => {
                        let isCategorySelected: boolean = false;
                        selectedCategories.map((selected) => {
                            if (category === selected) isCategorySelected = true
                        })
                        return <div key={i} className="">
                            <button className={`capitalize ${isCategorySelected ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                            onClick={()=>{
                                let referencedTable: string[] = [...selectedCategories];
                                if (!isCategorySelected) {
                                    referencedTable.push(category);
                                    setSelectedCategories([...referencedTable]);
                                } else {
                                    const newTable: string[] = [];
                                    console.log("referenced Table : " + referencedTable);
                                    console.log("category ASorina : " + category);
                                    referencedTable.map((referenced) => {
                                        if (referenced !== category) newTable.push(referenced)
                                    })
                                    console.log("newTable : " + newTable)
                                    setSelectedCategories([ ...newTable ]);
                                }
                            }}
                            >{category}</button>
                        </div>
                    })}
                    
                </div>
            </div>

            <div className='w-full border rounded-md p-3 flex gap-2'>
                <input
                    type="text" 
                    placeholder="Search for a skill"
                    className="w-full text-sm"
                /><Search />
            </div>

            {/* Suggestion SKILLS LIST according to the search input SHOULD BE HERE, 
            When clicking a skill, this one is automatically added to the current list of skills. 
            */}
            <div className="*:inline-block space-x-2 space-y-2">
                {(skillsPropositions.length >= 1) ? skillsPropositions.map((skillFromPropositions: SkillType, i: number) => {
                    let skillIsSelected: boolean = false;
                    props.currentSkillsListState.map((skillFromSelected) => {
                        if (skillFromSelected.skillItself.id === skillFromPropositions.id) {
                            skillIsSelected = true;
                        }
                    })
                    return <div key={i} className="">
                        <button className={`capitalize ${skillIsSelected ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                        onClick={() => {
                            if (skillIsSelected) {
                                handleDeleteChoosedSkill(skillFromPropositions);
                            } else {
                                handleSelectSkill(skillFromPropositions);
                            }
                        }}
                        >{skillFromPropositions.name}</button>
                    </div>
                }) : <>
                    <p className="text-black/70">Select a category or input in search.</p>
                </>}
            </div>

        </> : <>
            <p className="w-full text-center space-x-2 items-center text-red-700 bg-red-100 px-5 py-3 rounded-md">
                <span>You hit the maximum number of Skills you can add.</span>
            </p>
        </>}
    </>
}