import { userType } from '../types/userProfilesType';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
// const possibleSituations: "email does not exist" | "correct password, loggedIn" | "incorrect password"

interface signupProps {
    userInfos : userType,
    password: string,
    returnToDefault: () => void
}

export const loginFunction = async (email: string, password: string) => {
    try {
        const logoutResponse = await logoutFunction();
        console.log(logoutResponse);
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
        // console.log (loggedInUser.data);
    } catch (e) {
        console.error("error : ", e)
    }
}

export const signupFunction = async (props: signupProps) => {
    try {
        // flow : 
        // Log out first.
        // => getImagesPreviewUrl -> getImagesFromPreviews -> send images allong side with data.
        // WHAT THE BACKEND SHOUD DO :
        // Get the request -> store files somewhere, change the picture strings data given to the actual new image URLS
        // -> Make the stored images accessible through URL
        // -> store the changed user state to the db
        // send success to the front if done correctly
        const logoutResponse = await logoutFunction();
        console.log(logoutResponse);
        const formData = new FormData();
        let profilePicFile: File;
        const profilePic: string = props.userInfos.profilePicture;
        const pictures: string[] = props.userInfos.pictures;
        const profilePicRes = await fetch (profilePic);
        const profilePicBlob = await profilePicRes.blob();
        profilePicFile = new File([profilePicBlob], "profilePic.dat", {type: profilePicBlob.type});
        URL.revokeObjectURL(profilePic);
        formData.append("profilePictureFile", profilePicFile);
        for (let i = 0; i < pictures.length; i++) {
            console.log(pictures[i]);
            const picRes = await fetch(pictures[i]);
            const blob = await picRes.blob();
            const file: File = new File([blob], `${i}.dat`, {type: blob.type});
            console.log(file);
            URL.revokeObjectURL(pictures[i]);
            formData.append(`showOffPic_${i}`, file);
        }
        formData.append("password", props.password);
        formData.append("userInfos", JSON.stringify({...props.userInfos}));
        props.returnToDefault();
        const loggedInUserState = await axios.post(`${backendUrl}/register`, formData, { 
            withCredentials: true
        });
        // console.log(formData);
        return loggedInUserState.data
    } catch (e) {
        console.error("error : ", e)
    }
}

export const logoutFunction = async () => {
    try {
        const answer = await axios.get(`${backendUrl}/logout`, {
            withCredentials: true
        });
        return (answer.data);
    } catch (e) {
        // console.log(e);
        return "error";
    }
}