"use client";
import { Info, MessageCircle, Search, Send } from "lucide-react";
import Conversation from "@/src/components/conversation";
import { UserMessage, OtherUserMessage } from "@/src/components/conversation";
import { useState } from "react";

export default function MessagesPage () {
    const [teachOrLearn, setTeachOrLearn] = useState<"teach" | "learn">("teach");
    return <>
    <div className="h-full flex flex-col gap-5">
        <div className="flex gap-2"><MessageCircle /><h3>Messages</h3></div>
        <div className="h-full overflow-hidden flex flex-col">
            <div className="flex gap-2 w-full h-full overflow-auto">
                <div className="flex flex-col w-[30%] h-full gap-2">
                    <div className="w-full border rounded-md p-3 flex gap-2">
                        <input type="text" placeholder="Search for a message, conversation"
                        className="w-full text-sm"
                        /><Search />
                    </div>
                    <div className="w-full flex gap-2 justify-between">
                        <button className={teachOrLearn === "teach" ? "filledStyle w-full" : "unfilledStyle w-full"}
                        onClick={() => {
                            if (teachOrLearn !== "teach") setTeachOrLearn("teach");
                        }}
                        >You teach to</button>
                        <button className={teachOrLearn === "learn" ? "filledStyle w-full" : "unfilledStyle w-full"}
                        onClick={() => {
                            if (teachOrLearn !== "learn") setTeachOrLearn("learn");
                        }}
                        >You learn from</button>
                    </div>
                    <div className="w-full h-full overflow-auto space-y-2 rounded-md">
                        <Conversation imageThumbnail="" pseudo="Pseudo" messagePreview = {{
                            sender: "You", message: "Hello"
                        }} filledStyle={false}/>
                        <Conversation imageThumbnail="" pseudo="Another Pseudo" messagePreview = {{
                            sender: "Another Pseudo", message: "I am saying Hello too!"
                        }} filledStyle={true}/>
                    </div>
                </div>
                <div className="w-[70%] h-full flex flex-col rounded-md border border-blueDianne/30">
                    <div className="w-full py-5 px-6 flex justify-between border-b border-blueDianne/30">
                        <p>Pseudo and stuff</p>
                        <div>
                            <Info />
                        </div>
                    </div>
                    <div className="rounded-md w-full h-full overflow-auto gap-2 flex flex-col p-3 px-6">
                        <UserMessage text="Hello there"/>
                        <UserMessage text="how you doing ?"/>
                        <OtherUserMessage text="Hello there!!"/>
                        <OtherUserMessage text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos perferendis sed suscipit eaque perspiciatis, ab aliquam, delectus quis dicta, tempore minima sit cum! Laborum, voluptatum? Dolores minima dolore sed sapiente."/>
                        <UserMessage text="What ??"/>
                        <OtherUserMessage text="I'm fine, It is just a test. Don't worry!"/>
                        <UserMessage text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ipsum laborum praesentium quisquam voluptatum vitae vero consectetur qui eos veritatis? Natus consequatur ipsa sapiente iusto, quibusdam ex est provident officiis?"/>
                        <UserMessage text="HEHE"/>
                    </div>
                    <div className="w-full p-3 px-6 flex gap-2 border-t border-blueDianne/30">
                        <input type="text" placeholder="Write a message" className="w-full rounded-md border border-blueDianne/20 p-3"/>
                        <div className="m-auto cursor-pointer">
                            <Send />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
}