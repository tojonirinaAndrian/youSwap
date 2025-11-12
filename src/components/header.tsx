'use client'
import { useGlobalStore } from "@/store/use-global-store";
import Link from "next/link"
import { useRouter } from "next/navigation";
const router = useRouter();

export default function Header () {
    const { setWhereIsLoginRegisterPage } = useGlobalStore();
    return <div className="fixed top-0 w-full p-5">
    <header className='flex justify-between'>
        <Link className="font-medium" href='/user'>YouSwap</Link>
        <div className="flex gap-2">
            <button className="borderedButton"
            onClick={() => {
                setWhereIsLoginRegisterPage('login');
                router.push('/registerLogin');
            }}
            >Log in</button>
            <button className="filledButton"
            onClick={() => {
                setWhereIsLoginRegisterPage('signup');
                router.push('/registerLogin');
            }}
            >Sign up</button>
        </div>
    </header>
</div>
}