// 'use client';
// import { useState } from "react"

import userInterface from "../types/userProfilesType";

interface userStateProps {
    isInSidebar: boolean,
    user: userInterface
}

export default function UserState (props: userStateProps) {
    return <div className="rounded-xl bg-white px-6 py-5 flex gap-1 w-full">
        <div className="rounded-md w-full">
            <p className="font-medium">{props.user.pseudo}
                {(!props.isInSidebar && ` ~ ${props.user.fullName}`)}
            </p>
            <p>{"Points : " + props.user.currentPoints}</p>
            <div className="flex gap-2">
                <p>Level {props.user.level}</p>
                <p>-</p>
                <div className="flex gap-1">
                    <div className={`bg-${props.user.titleColor}-500 h-3 w-3 rounded-full my-auto`}></div>
                    <p>{props.user.evolutionStatus}</p>
                </div>
            </div>
        </div>
    </div>
}