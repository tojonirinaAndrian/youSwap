import axios from 'axios';
import {userType} from '../types/userProfilesType';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
// const possibleSituations: "email does not exist" | "correct password, loggedIn" | "incorrect password"

interface signupProps {
    userInfos : userType,
    password: string
}

export const loginFunction = async (email: string, password: string) => {
    try {
        const loggedInUserState = await axios.post(`${backendUrl}/login`, {
            email, password
        }, {
            withCredentials: true
        })
        return loggedInUserState.data
    } catch (e) {
        console.error("error : ", e)
    }
}

export const getCurrentlyLoggedInUser = async () => {
    try {
        const loggedInUser = await axios.get(`${backendUrl}/getCurrentlyLoggedInUser`, {
            withCredentials: true
        })
        return { ...loggedInUser.data }
    } catch (e) {
        console.error("error : ", e)
    }
}

export const signupFunction = async (props: signupProps) => {
    try {
        const loggedInUserState = await axios.post(`${backendUrl}/register`, {
            ...props.userInfos
        })
        return loggedInUserState.data
    } catch (e) {
        console.error("error : ", e)
    }
}

export const logoutFunction = async () => {
    try {
        const answer = await axios.get(`${backendUrl}/logout`);
        if (answer.status === 401) {
            return "error";
        } else if (answer.status === 200) {
            return answer.data;
        }
    } catch (e) {
        console.log(e);
        return "error";
    }
}