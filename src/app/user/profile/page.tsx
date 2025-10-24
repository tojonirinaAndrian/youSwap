'use client';
import ProfileView from "@/src/components/profileComponents/profileView";
import { useState } from "react";
import { PencilLine, User } from "lucide-react";
import ModifyProfile from "@/src/components/profileComponents/modifyProfile";
import profileInterface from "@/src/types/userProfilesType";

export default function ProfilePage () {
    const [whereIsProfile, setWhereIsProfile] = useState<'view' | 'modify'>('view');    
    const profile: profileInterface = {
        fullName: "Tojonirina Andrianjafiniaina",
        pseudo: "Tj-san",
        profilePictureLink: "",
        helpedPeople: 0,
        level: 0,
        title: "Noob",
        titleColor: "blue",
        currentPoints: 0,
        accumulatedPoints: 0,
        leftPointsForNextLevel: 100,
        description: "Someone puts his favorite quote here.",
        skills: {
            learnSkills: [
                { name: "Pastry", level: "beginner", skillId: "1" },
                { name: "Piano", level: "beginner", skillId: "2"}
            ], 
            teachSkills : [
                { name: "React Dev", level: "advanced" , skillId: "1"},
                { name: "Basketball", level: "advanced", skillId: "2" },
                { name: "Drawing", level: "intermediate", skillId: "3" }
            ]
        },
        pictures: [""],
        portfolioVideoLink: "",
        portfolioLinks : [
            { label: "Facebook", link: "www.facebook.com", linkId: "1" },
            { label: "Portfolio Website", link: "www.thisisthelink.com", linkId: "2" }
        ]
    }
    return <>
    <div className="h-full flex flex-col gap-5">
        <div className="flex justify-between">
            <div className="flex gap-2 my-auto">
                <User /><h3>Profile</h3>
            </div>
            <div>
                {(whereIsProfile === 'view') ? (
                    <>
                    <button className="borderedButton flex gap-2"
                    onClick={() => {
                        setWhereIsProfile ('modify')
                    }}
                    >
                        <PencilLine size={18} className="my-auto"/>
                        Modify
                    </button>    
                    </>
                ) : (
                    <>
                    <button className="borderedButton"
                    onClick={() => setWhereIsProfile('view')}
                    >
                        Cancel
                    </button>
                    </>
                )}
                
            </div>
            
        </div>
        {(whereIsProfile === "view") && <ProfileView 
            fullName={profile.fullName}
            profilePictureLink={profile.profilePictureLink}
            helpedPeople={profile.helpedPeople}
            pseudo={profile.pseudo}
            level={profile.level}
            title={profile.title}
            titleColor={profile.titleColor}
            currentPoints={profile.currentPoints}
            accumulatedPoints={profile.accumulatedPoints}
            leftPointsForNextLevel={profile.leftPointsForNextLevel}
            description={profile.description}
            skills={profile.skills}
            pictures={profile.pictures}
            portfolioLinks={profile.portfolioLinks}
            portfolioVideoLink={profile.portfolioVideoLink}
        />}
        {(whereIsProfile === "modify") && <>
            <ModifyProfile profile={profile} setWhereIsProfile={setWhereIsProfile} />
        </>}
    </div>
    </>
}