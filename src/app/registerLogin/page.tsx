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
    <div className="w-full grid grid-cols-2">
        <div className="h-[100dvh] w-full bg-blue-500 sticky top-0">
            <Link 
            className="filledButton absolute top-5 left-5 hover:!bg-lightCream"
            href='/'
            >
                Back to home
            </Link> 
        </div>
        <div className="p-10 w-full">
            {whereIsUser()}
        </div>
    </div>
    </>)
}