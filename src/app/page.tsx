'use client'
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/use-global-store";
import Header from "../components/header";
export default function Page() {
	const router = useRouter();
    const { setWhereIsLoginRegisterPage } = useGlobalStore()

	return(
		<>
		<Header />
		<div className="w-full h-[100dvh] p-10 flex">
			<div className="max-w-[70dvw] m-auto space-y-5 text-center">
				<h1 className="!text-8xl">Learn, teach, improve.</h1>
				<p>Teach someone a skill you know and learn a skill you don't in exchange.<br></br>We believe that everyone has something to share.</p>
				<div className="flex gap-2 items-center justify-center">
					<button className="filledButton" onClick={()=>{
						setWhereIsLoginRegisterPage('signup');
						router.push('/registerLogin');
					}}>Sign up now</button>
					<button className="borderedButton" onClick={()=>{
						setWhereIsLoginRegisterPage('login');
						router.push('/registerLogin');
					}}>Log in</button>
				</div>
			</div>
		</div>
		</>
	)
}