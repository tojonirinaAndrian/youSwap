import { Calendar } from "lucide-react";

export default function AgendaPage () {
    return <>
        <div className="h-full flex flex-col gap-5">
            <div className="flex gap-2">
                <Calendar /><h3>Agenda ~ Your appointments ~ Your timetable</h3>
            </div>
            <div className="gap-2 flex flex-col h-full overflow-auto">
                <p>Hello again, here are your schudel.</p>
            </div>
        </div>
    </>
}