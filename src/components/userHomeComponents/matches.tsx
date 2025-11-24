'use client';
import { useGlobalStore } from "@/store/use-global-store";
import MatchCard from "../matchCard"

export default function Matches () {
    const { userProfile } = useGlobalStore()
    return <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
            <MatchCard user={userProfile}/>
            <MatchCard user={userProfile}/>
            <MatchCard user={userProfile}/>
        </div>
    </div>
}