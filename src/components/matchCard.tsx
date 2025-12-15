"use client";
import { useGlobalStore } from "@/store/use-global-store";
import { userType } from "../types/userProfilesType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface matchCardProps {
    user: userType
};

export default function MatchCard (props: matchCardProps) {
    const { userProfile, setSeeingProfile } = useGlobalStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    function handleSeeProfile () {
        setIsLoading(true);
        setSeeingProfile(props.user);
        router.push("/userProfile");
    };
    return <>
    <div className="p-5 bg-blueDianne/5 rounded-md flex flex-col gap-5 w-full">
        <div className="rounded-md flex gap-5 w-full">
            <div className="relative rounded-full h-32 w-32 flex">
                <Image src={props.user.profilePicture} width={500} height={500} alt="ProfilePicture"
                className="w-full h-full object-cover rounded-full bg-red-500"
                />
            </div>
            <div className="my-auto">
                <p className="font-medium">{props.user.pseudo}</p>
                <p>Points : {props.user.currentPoints}</p>
                <div className="flex gap-2">
                    <p>Level {props.user.level}</p>
                    <p>-</p>
                    <div className="flex gap-1">
                        <div className={`bg-${props.user.titleColor}-500 h-3 w-3 rounded-full my-auto`}></div>
                        <p>{props.user.evolutionStatus}</p>
                    </div>
                </div>
                <>
                    {props.user.availablility === "Both" ? <div className="flex gap-2 *:text-blueDianne font-medium">
                        <p>In person</p>
                        <p>-</p>
                        <p>Online</p>
                    </div> : <p className="text-blueDianne font-medium">{props.user.availablility}</p>}
                </>
            </div>
        </div>
        <div className="text-sm space-y-1">
            <div className="flex gap-1">
                <p className="my-auto">Teaches : </p>
                <div className="*:inline-block space-x-1 space-y-1 *:!cursor-default">
                    {(props.user.choosedTeachingSkills.map ((skill, i) => {
                        let isCommon: boolean = false;
                        userProfile.choosedLearningSkills.map((meSkill) => {
                            if (meSkill.id === skill.id) isCommon = true;
                        })
                        if (skill.proficiency === "Advanced") {
                            return <div key={skill.id} className={(isCommon ? "border-2" : "border") + " filledStyle border-red-300 !bg-red-200 !text-red-500"}>
                                {skill.skillItself.name}
                            </div>
                        } else if (skill.proficiency === "Beginner") {
                            return <div key={skill.id} className={(isCommon ? "border-2" : "border") + " filledStyle border border-green-500 !bg-green-200 !text-green-700"}>
                                {skill.skillItself.name}
                            </div>
                        } else if (skill.proficiency === "Intermediate") {
                            return <div key={skill.id} className={(isCommon ? "border-2" : "border") +  " filledStyle border border-yellow-500 !bg-yellow-200 !text-yellow-700"}>
                                {skill.skillItself.name}
                            </div>
                        } else {
                            return <div key={i}></div>
                        }
                    }))}
                </div>
            </div>
            <div className="flex gap-1">
                <p className="my-auto">Learns : </p>
                <div className="*:inline-block space-x-1 space-y-1 *:!cursor-default">
                    {(props.user.choosedLearningSkills.map ((skill, i) => {
                        let isCommon: boolean = false;
                        userProfile.choosedTeachingSkills.map((meSkill) => {
                            if (meSkill.id === skill.id) isCommon = true;
                        })
                        if (skill.proficiency === "Advanced") {
                            return <div key={skill.id} className={(isCommon ? "border-2" : "border") + " filledStyle border border-red-300 !bg-red-200 !text-red-500"}>
                                {skill.skillItself.name}
                            </div>
                        } else if (skill.proficiency === "Beginner") {
                            return <div key={skill.id} className={(isCommon ? "border-2" : "border") + " filledStyle border border-green-500 !bg-green-200 !text-green-700"}>
                                {skill.skillItself.name}
                            </div>
                        } else if (skill.proficiency === "Intermediate") {
                            return <div key={skill.id} className={(isCommon ? "border-2" : "border") + " filledStyle border border-yellow-500 !bg-yellow-200 !text-yellow-700"}>
                                {skill.skillItself.name}
                            </div>
                        } else {
                            return <div key={i}></div>
                        }
                    }))}
                </div>
            </div>
        </div>
        <div className={`flex gap-2 ${isLoading ? " *:opacity-50 " : ""}`}>
            <button className="borderedButton w-full"
            onClick={() => {
                handleSeeProfile();
            }}
            >See profile</button>
            <button className="filledButton w-full">Say Hello</button>
        </div>
    </div>
        
    </>
}