import { Settings, X } from "lucide-react"
import { useState } from "react";
import ColorSchemeModalChoice from "./colorSchemeModalChoice";
interface settingsModalProps {
    setIsSettingsModalOpen: (arg0: boolean) => void
}

export default function SettingsModal (props: settingsModalProps) {
    const [isColorSchemeModalOpen, setIsColorSchemeModalOpen] = useState<boolean>(false);
    return (<>
    {isColorSchemeModalOpen && <ColorSchemeModalChoice setIsColorSchemeModalOpen={setIsColorSchemeModalOpen}/>}
    <div className="w-full h-screen z-1 fixed flex top-0 left-0 p-5">
        <div className="m-auto bg-white p-5 rounded-xl space-y-3 min-w-[20rem] z-2 max-h-full overflow-auto">
            <div>
                <div className="w-full flex justify-end">
                    <div className="cursor-pointer"
                    onClick={() => props.setIsSettingsModalOpen(false)}
                    >
                        <X size={20}/>
                    </div>
                </div>
                <h3 className="flex gap-2">
                    <Settings />
                    Settings
                </h3>
                <p className="text-black/70">Change your preferences here.</p>
            </div>
            <div className=" flex flex-col gap-2 *:bg-blueDianne/5 *:rounded-md *:hover:bg-blueDianne/20 *:text-blueDianne *:px-5 *:py-3 mt-10 *:cursor-pointer">
                <button
                onClick={() => setIsColorSchemeModalOpen(true)}
                >Color scheme</button>
                <button>Change password</button>
                <button>Reset all progress</button>
                <button>Download this week !</button>
            </div>
        </div>
        <div className="w-full h-screen fixed top-0 left-0 bg-black/70"
            onClick={() => props.setIsSettingsModalOpen(false)}
        ></div>
    </div>
    </>)
}