'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/use-global-store";
import { Home } from "lucide-react";
import Matches from "@/src/components/userHomeComponents/matches";
import Teach from "@/src/components/userHomeComponents/teach";
import TalkedTo from "@/src/components/userHomeComponents/talkedTo";
import Learn from "@/src/components/userHomeComponents/learn";
import SearchSomeone from "@/src/components/userHomeComponents/searchSomeone";

export default function HomePage() {
    const [whereAreMatches, setWhereAreMatches] = useState<'learn' | 'teach'| "searchSomeone" | 'matches' | 'talkedTo'> ('matches');
    // useEffect(()=>{
        // if (!isLoggedIn) {
        //     router.push('/registerLogin');
        // }
    // }, [])
    return (<>
    <div className="h-full flex flex-col gap-5">
        <div className="flex gap-2">
            <Home />
            <h3>Home ~ <span>{<>
                {(whereAreMatches === 'learn' && "Learn a skill from someone")}
                {(whereAreMatches === 'teach' && "Teach a skill to someone")}
                {(whereAreMatches === 'matches' && "Your matches")}
                {(whereAreMatches === 'talkedTo' && "People you already talked to here")}
                {(whereAreMatches === 'searchSomeone' && "Search for someone you may know")}
            </>}</span>
            </h3>
        </div>
        <div className="h-full overflow-hidden flex flex-col gap-2">
            <div className="flex gap-2">
                <button className={(whereAreMatches==='matches' ? "filledStyle" : "borderedStyle")}
                onClick={() => setWhereAreMatches('matches')}
                >{`Match(es)`}</button>
                <div className="w-[5px] h-[5px] bg-blueDianne/50 my-auto rounded-full"></div>

                <button className={(whereAreMatches==='teach' ? "filledStyle" : "borderedStyle")}
                onClick={() => setWhereAreMatches('teach')}
                >Teach</button>
                <div className="w-[5px] h-[5px] bg-blueDianne/50 my-auto rounded-full"></div>
                
                <button className={(whereAreMatches==='learn' ? "filledStyle" : "borderedStyle")}
                onClick={() => setWhereAreMatches('learn')}
                >Learn from</button>
                <div className="w-[5px] h-[5px] bg-blueDianne/50 my-auto rounded-full"></div>
                
                <button className={(whereAreMatches==='searchSomeone' ? "filledStyle" : "borderedStyle")}
                onClick={() => setWhereAreMatches('searchSomeone')}
                >Search someone</button>
                <div className="w-[5px] h-[5px] bg-blueDianne/50 my-auto rounded-full"></div>

                <button className={(whereAreMatches==='talkedTo' ? "filledStyle" : "borderedStyle")}
                onClick={() => setWhereAreMatches('talkedTo')}
                >Talked to</button>
            </div>
            <div className="rounded-md border w-full h-full border-blueDianne/50 p-5 overflow-y-auto">
                {(whereAreMatches === 'learn' && <Learn />)}
                {(whereAreMatches === 'matches' && <Matches />)}
                {(whereAreMatches === 'teach' && <Teach />)}
                {(whereAreMatches === 'searchSomeone' && <SearchSomeone />)}
                {(whereAreMatches === 'talkedTo' && <TalkedTo />)}
            </div>
        </div>
    </div>
    </>
    )
}