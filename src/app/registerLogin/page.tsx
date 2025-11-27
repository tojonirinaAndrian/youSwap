'use client';
import LoginPage from "./login";
import SignupPage from "./signup";
import { useGlobalStore } from "@/store/use-global-store";
import InfosPage from "./infos";
import SkillsPage from "./skills";
import SkillsProficiency from "./skillsProficiency";
import ProfilePicture from "./profilePicture";
import ShowOffPictures from "./showOffPictures";

export default function Page() {
    const {whereIsLoginRegisterPage } = useGlobalStore()

    function whereIsUser () {
        if (whereIsLoginRegisterPage === 'login') {
            return <LoginPage />
        } else if (whereIsLoginRegisterPage === 'signup') {
            return <SignupPage />
        } else if (whereIsLoginRegisterPage === 'infos') {
            return <InfosPage />
        } else if (whereIsLoginRegisterPage === 'skills') {
            return <SkillsPage />
        } else if (whereIsLoginRegisterPage === 'skillsProficiency') {
            return <SkillsProficiency />
        } else if (whereIsLoginRegisterPage === "profilePicture") {
            return <ProfilePicture />
        } else if (whereIsLoginRegisterPage === "showOffPictures") {
            return <ShowOffPictures />
        }
    }
    return (<>
    <div className="bg-blueDianne flex p-4 xl:px-100 md:px-40 h-screen">
        <div className="w-full h-full bg-white rounded-md p-10 overflow-auto">
            {whereIsUser()}
        </div>
    </div>
    </>)
}