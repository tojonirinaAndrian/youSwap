import axios from "axios";
import { userType } from "../types/userProfilesType";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getMatchingProfiles = async (page: number, userProfile: userType) => {
    try {
        const response = await axios.post(`${backendUrl}/fetchMatchingProfiles`, {
            page,
            userProfile
        }, {
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const getMatchingProfilesByTeachingSkills = async (page: number, choosedSkillId: string) => {
    try {
        const response = await axios.get(`${backendUrl}/getMatchingProfilesByTeachingSkills/choosedSkillId=${choosedSkillId}?page=${page}`, {
            withCredentials: true
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}