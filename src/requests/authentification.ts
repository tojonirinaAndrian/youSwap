import axios from 'axios';
import {userType} from '../types/userProfilesType';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
// const possibleSituations: "email does not exist" | "correct password, loggedIn" | "incorrect password"

interface signupProps {
    userInfos : userType
}
export const loginFunction = async (email: string, password: string) => {
    try {
        const loggedInUser = await axios.post(`${backendUrl}/login`, {
            email, password
        }, {
            withCredentials: true
        })
        return loggedInUser.data
    } catch (e) {
        console.error("error : ", e)
    }
}

export const signupFunction = async (props: signupProps) => {
    try {
        const loggedInUser = await axios.post(`${backendUrl}/signup`, {
            ...props.userInfos
        })
        return loggedInUser.data
    } catch (e) {
        console.error("error : ", e)
    }
}