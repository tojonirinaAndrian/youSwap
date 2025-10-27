'use client';
import ProfileView from "@/src/components/profileComponents/profileView";
import { useState } from "react";
import { PencilLine, User } from "lucide-react";
import ModifyProfile from "@/src/components/profileComponents/modifyProfile";

export default function ProfilePage () {
    const [whereIsProfile, setWhereIsProfile] = useState<'view' | 'modify'>('view');
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
        {(whereIsProfile === "view") && <ProfileView />}
        {(whereIsProfile === "modify") && <>
            <ModifyProfile setWhereIsProfile={setWhereIsProfile} />
        </>}
    </div>
    </>
}