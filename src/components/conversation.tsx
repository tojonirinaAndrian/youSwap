import Image from "next/image"
interface conversationProps {
    imageThumbnail: string,
    pseudo: string,
    messagePreview: {
        sender: string,
        message: string
    },
    filledStyle: boolean
}

export default function Conversation(props: conversationProps) {
    return <>
    <div className={"hover:bg-blueDianne/10 w-full p-3 px-4 rounded-md border-1 border-blueDianne/10 space-y-2 cursor-pointer " + (props.filledStyle ? "bg-blueDianne/10" : "")}>
        <div className="flex gap-2 items-center">
            <div className="*:rounded-full *:object-cover *:w-full h-8 w-8">
                {(props.imageThumbnail !== "") ? <Image src={props.imageThumbnail} alt={props.pseudo} className="bg-slate-300">
                </Image> : <div className="bg-red-500 h-full"></div> 
                }
            </div>
            <p className={"font-medium " + (props.filledStyle ? "text-blueDianne" : "")}>{props.pseudo}</p>
        </div>
        <p className="text-sm">{props.messagePreview.sender} : {props.messagePreview.message}</p>
    </div>
    </>
}

export function UserMessage(props: {text: string}) {
    return <div className="max-w-[60%] ml-auto rounded-t-md rounded-l-md p-3 bg-green-100 text-green-900">
        {props.text}
    </div>
}

export function OtherUserMessage(props: {text: string}) {
    return <div className="mr-auto p-3 bg-blueDianne/10 rounded-r-md rounded-t-md max-w-[60%] text-blueDianne">
        {props.text}
    </div>
}