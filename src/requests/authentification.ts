import axios from 'axios';
import { env } from 'process';
import userInterface from '../types/userProfilesType';

export const loginFunction = async (email: string, password: string) => {
    try {
        const loggedInUser: userInterface = await axios.post(`${env.BACKEND_URL}/login`, {
            email, password
        })
        return {
            ...loggedInUser
        }
    } catch (e) {
        console.error("error : ", e)
    }
}

export const signupFunction = async (userInfos: userInterface) => {
    try {
        const loggedInUser: userInterface = await axios.post(`${env.BACKEND_URL}/signup`, {
            ...userInfos
        })
        return {
            ...loggedInUser
        }
    } catch (e) {
        console.error("error : ", e)
    }
}