'use client'
import { ReactElement, useState } from "react";
import { Home, Settings, Calendar, MessageCircle, DoorOpen, User, Info } from "lucide-react";
import UserState from "./userState";
import LogOutModal from "./logOutModal";
import Link from "next/link";
import SettingsModal from "./settingsModal";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface sidebarElementProps {
    label: string,
    icon: ReactElement,
    linkingTo: string
}

const sidebarElements: sidebarElementProps[] = [
    {
        label: "Home", icon: <Home />, linkingTo: "/user"
    }, {
        label: "Profile", icon: <User />, linkingTo: "/user/profile"
    }, {
        label: "Messages", icon: <MessageCircle />, linkingTo: "/user/messages"
    }, {
        label: "Agenda", icon: <Calendar />, linkingTo: "/user/agenda"
    }, {
        label: "Informations", icon: <Info />, linkingTo: "/user/informations"
    }
]

export default function Sidebar() {
    const pathname = usePathname();
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
    const router = useRouter();

    return (<>
        {isLoggingOut && <LogOutModal setIsLoggingOut={setIsLoggingOut}/>}
        {isSettingsModalOpen && <SettingsModal setIsSettingsModalOpen={setIsSettingsModalOpen}/>}
        <div className="w-full space-y-2 h-full flex flex-col">
            <Link href={"/"} className="font-medium px-6 py-5 rounded-xl bg-lightCream">YouSwap</Link>
            <UserState 
                pseudo="Pseudo"
                level={0} 
                points={0} 
                title="Noob"
                titleColor="blue"
            />
            <div className="p-2 rounded-xl bg-lightCream h-full">
                <div className="*:py-3 *:cursor-pointer *:px-4 *:rounded-md *:hover:bg-blueDianne/10 *:hover:text-blueDianne space-y-1 *:flex *:gap-2 *:w-full *:font-medium">
                    {sidebarElements.map((sidebarElement) => {
                        return <div 
                        key={sidebarElement.label} 
                        onClick={() => {
                            if (pathname !== sidebarElement.linkingTo) router.push(sidebarElement.linkingTo)
                        }}
                        className={(pathname === sidebarElement.linkingTo) ? "bg-blueDianne/10 text-blueDianne" : ""}>
                            {sidebarElement.icon}{sidebarElement.label}
                        </div>
                    })}
                    <div
                    onClick={() => setIsSettingsModalOpen(true)}
                    >
                        <Settings />
                        Settings
                    </div>
                    <div className="hover:!bg-red-200 hover:!text-red-800"
                        onClick={() => setIsLoggingOut(true)}
                    >
                        <DoorOpen />
                        <p>Log out</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}