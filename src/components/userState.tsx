// 'use client';
// import { useState } from "react"

interface useStateProps {
    pseudo: string,
    points: number,
    level: number,
    title: string,
    fullName?: string,
    titleColor: 'blue' | 'red';
}

export default function UserState (props: useStateProps) {
    return <div className="rounded-xl bg-white px-6 py-5 flex gap-1 w-full">
        <div className="rounded-md w-full">
            <p className="font-medium">{props.pseudo}
                {(props.fullName && ` ~ ${props.fullName}`)}
            </p>
            <p>{"Points : " + props.points}</p>
            <div className="flex gap-2">
                <p>Level {props.level}</p>
                <p>-</p>
                <div className="flex gap-1">
                    <div className={`bg-${props.titleColor}-500 h-3 w-3 rounded-full my-auto`}></div>
                    <p>{props.title}</p>
                </div>
            </div>
        </div>
    </div>
}