'use client';
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/use-global-store";
import { userType } from "@/src/types/userProfilesType";
import MatchCard from "../matchCard";
import { getMatchingProfiles } from "@/src/requests/matches";

export default function Matches () {
    const [ page, setPage ] = useState<number>(0);
    const { userProfile } = useGlobalStore();
    const [ matchingProfiles, setMatchingProfiles ] = useState<userType[]>([]);
    useEffect(() => {
        const dataFetching = async () => {
            const profiles = await getMatchingProfiles(page, userProfile);
            // console.log(profiles.length);
            // console.log(profiles);
            setMatchingProfiles(profiles);
        }
        dataFetching();
    }, [page])
    return <div className="space-y-2">
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
                {(matchingProfiles && matchingProfiles.length > 0) ? matchingProfiles.map((match) => {
                    return <MatchCard user={match} key={match.id}/>
                }) : <>No matches</>}
            </div>
        </div>
        <div className="w-full flex justify-center p-3">
            <button className="filledButton"
            onClick={() => {
                setPage(page + 1)
            }}>
                See more
            </button>
        </div>
    </div>
}