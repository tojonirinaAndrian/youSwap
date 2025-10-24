import MatchCard from "../matchCard"

export default function Matches () {
    return <div className="space-y-2">
    <div className="grid grid-cols-2 gap-2">
        <MatchCard />
        <MatchCard />
        <MatchCard />
    </div>
</div>
}