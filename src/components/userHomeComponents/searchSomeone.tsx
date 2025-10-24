import { Search } from "lucide-react";

export default function SearchSomeone () {
    return <>
        <div className="space-y-2">
            <p className="text-black/70">Search for someone you <span className="font-medium">never</span> had a conversation with.</p>
            <div className="w-full border rounded-md p-3 flex gap-2">
                <input type="text" placeholder="Type a pseudo, name..."
                className="w-full text-sm"
                /><Search />
            </div>
        </div>
    </>
}