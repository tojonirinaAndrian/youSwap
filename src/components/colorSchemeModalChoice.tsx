import { Palette, X } from "lucide-react";
Type colorSchemeChoiceProps {
    setIsColorSchemeModalOpen: (arg0: boolean) => void
}

export default function ColorSchemeModalChoice (props: colorSchemeChoiceProps) {
    return <>
        <div className="w-full h-screen z-3 fixed flex top-0 left-0 p-5">
        <div className="m-auto bg-white p-5 rounded-xl space-y-3 min-w-[20rem] z-4 max-h-full overflow-auto flex flex-col">
            <div>
                <div className="w-full flex justify-end">
                    <div className="cursor-pointer"
                    onClick={() => props.setIsColorSchemeModalOpen(false)}
                    >
                        <X size={20}/>
                    </div>
                </div>
                <h3 className="flex gap-2">
                    <Palette />
                    Color Scheme
                </h3>
                <p className="text-black/70">Choose your prefered color here.</p>
            </div>
            <div className=" flex gap-3 mt-10 *:cursor-pointer *:h-10 *:w-10 *:rounded-full mx-auto">
                <div className="bg-blue-500"></div>
                <div className="bg-blueDianne"></div>
                <div className="bg-green-600"></div>
                <div className="bg-amber-600"></div>
            </div>
        </div>
        <div className="w-full h-screen fixed top-0 left-0 bg-black/50"
            onClick={() => props.setIsColorSchemeModalOpen(false)}
        ></div>
    </div>
    </>
}