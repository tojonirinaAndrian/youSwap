'use client';
import Sidebar from "@/src/components/sidebar";

export default function UserPagesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    // const { isLoggedIn, setWhereIsLoginRegisterPage } = useGlobalStore();
    // const router = useRouter();
    // if (!isLoggedIn) {
    //     setWhereIsLoginRegisterPage('login');
    //     router.push('/registerLogin');
    // }
    return (<>
    <div className="bg-blueDianne/90">
        <div className="flex p-4 gap-2 h-screen">
            <div className="w-1/6">
                <Sidebar />
            </div>
            <div className="w-5/6">
                <div className="bg-lightCream rounded-xl w-full h-full p-6">
                    {children}
                </div>
            </div>
        </div>
    </div>
    </>)
}