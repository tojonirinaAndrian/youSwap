import axios from 'axios';
import userInterface from '../types/userProfilesType';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const loginFunction = async (email: string, password: string) => {
    try {
        // const loggedInUser: userInterface = await axios.post(`${backendUrl}/login`, {
        //     email, password
        // })
        // return {
        //     ...loggedInUser
        // }
        // const response = await axios.post(`${backendUrl}/login`, {
        //     email, password
        // })
        const response2 = await axios.get(`${backendUrl}`);
        return response2;
    } catch (e) {
        console.error("error : ", e)
    }
}

export const signupFunction = async (userInfos: userInterface) => {
    try {
        const loggedInUser: userInterface = await axios.post(`${backendUrl}/signup`, {
            ...userInfos
        })
        return {
            ...loggedInUser
        }
    } catch (e) {
        console.error("error : ", e)
    }
}