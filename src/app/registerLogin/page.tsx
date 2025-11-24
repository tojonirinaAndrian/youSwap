'use client';
import { useEffect, useState } from "react";
import LoginPage from "./login";
import SignupPage from "./signup";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/use-global-store";
import Link from 'next/link';
import InfosPage from "./infos";
import SkillsPage from "./skills";

export default function Page() {
    const router = useRouter();
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