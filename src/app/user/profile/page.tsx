'use client';
import ProfileView from "@/src/components/profileComponents/profileView";
import { useState } from "react";
import { PencilLine, User } from "lucide-react";
import ModifyProfile from "@/src/components/profileComponents/modifyProfile";
import { useGlobalStore } from "@/store/use-global-store";
import {userType} from "@/src/types/userProfilesType";

export default function ProfilePage () {
    const [whereIsProfile, setWhereIsProfile] = useState<'view' | 'modify'>('view');
    const { setUserProfile, userProfile } = useGlobalStore();
    return <>
    <div className="h-full flex flex-col gap-5">
        {(whereIsProfile === "view") ? <ProfileView setWhereIsProfile={setWhereIsProfile}/>
        : <ModifyProfile setWhereIsProfile={setWhereIsProfile} />}
    </div>
    </>
}