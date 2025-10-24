// 'use client'
import Link from "next/link"
export default function Header () {
    return <div className="fixed top-0 w-full p-5">
    <header className='flex justify-between'>
        <Link className="font-medium" href='/user'>YouSwap</Link>
        <div className="flex gap-2">
            <button className="borderedButton">Log in</button>
            <button className="filledButton">Sign up</button>
        </div>
    </header>
</div>
}