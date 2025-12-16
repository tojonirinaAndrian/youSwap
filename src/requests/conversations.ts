import axios from "axios";
import { userType } from "../types/userProfilesType";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const sayHelloFunction = async (
    userToSendTo: userType,
    messageContent: string,
    commonSkillIds: string[]
) => {
    try {
        const response = await axios.post(`${backendUrl}/sayHello`, {
            userToSendTo,
            messageContent,
            commonSkillIds
        }, {
            withCredentials: true
        });
        console.log(response.data);
        
    } catch (e) {
        console.log(e);
    }
}