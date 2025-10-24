import MatchCard from "@/src/components/matchCard";
import { Info } from "lucide-react";

export default function InformationsPage () {
    return <>
    <div className="h-full flex flex-col gap-5">
        <div className="flex gap-2">
            <Info />
            <h3>Informations ~ See how it works here!</h3>
        </div>
        <div className="gap-2 flex flex-col h-full overflow-auto">
            <p>Informations</p>
        </div>
    </div>
    </>
}