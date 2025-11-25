import { SkillType } from "../types/skillsType";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getSkillsByCategory = async (categoryNames: string[]) => {
    try {
        const response = await axios.post(`${backendUrl}/getSkillsByCategory`, {
            categoryNames: categoryNames
        });
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}
