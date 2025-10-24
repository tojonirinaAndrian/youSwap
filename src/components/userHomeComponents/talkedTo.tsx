import { Search } from "lucide-react";

export default function TalkedTo () {
    return <>
        <div className="space-y-2">
            <p className="text-black/70">Here are the people you <span className="font-medium">already</span> had a conversation with.</p>
            <div className="w-full border rounded-md p-3 flex gap-2">
                <input type="text" placeholder="Type a pseudo, name..."
                className="w-full text-sm"
                /><Search />
            </div>
        </div>
    </>
}