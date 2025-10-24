export default function MatchCard () {
    return <>
        <div className="p-5 border-blueDianne/50 rounded-md flex gap-5 w-full bg-blueDianne/10">
            <div className="relative rounded-full bg-red-500 h-32 w-32 flex">
                <h2 className="m-auto text-white">
                    98%
                </h2>
            </div>
            <div className="flex flex-col justify-between py-3">
                <div>
                    <p className="font-medium">Name</p>
                    <p>Level 0 - Noob</p>
                </div>
                <div className="flex gap-2">
                    <button className="borderedButton">See profile</button>
                    <button className="borderedButton">Say Hello</button>
                </div>
            </div>
        </div>
    </>
}