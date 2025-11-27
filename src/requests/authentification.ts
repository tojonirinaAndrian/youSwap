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
        // flow : 
        // => getImagesPreviewUrl -> getImagesFromPreviews -> send images allong side with data.
        // WHAT THE BACKEND SHOUD DO :
        // Get the request -> store files somewhere, change the picture strings data given to the actual new image URLS
        // -> Make the stored images accessible through URL
        // -> store the changed user state to the db
        // send success to the front if done correctly
        let profilePicFile: File;
        let showOffPicturesFiles: File[] = [];
        const profilePic: string = props.userInfos.profilePicture;
        const pictures: string[] = props.userInfos.pictures;
        const profilePicRes = await fetch (profilePic);
        const profilePicBlob = await profilePicRes.blob();
        profilePicFile = new File([profilePicBlob], "profilePic.dat", {type: profilePicBlob.type});
        URL.revokeObjectURL(profilePic);
        pictures.map (async (pic, i) => {
            const picRes = await fetch(pic);
            const blob = await picRes.blob();
            const file = new File([blob], `${i}.dat`, {type: blob.type});
            showOffPicturesFiles.push(file);
            URL.revokeObjectURL(pic);
        })
        const formData = new FormData();
        formData.append("profilePictureFile", profilePicFile);
        showOffPicturesFiles.map((picFile, i) => {
            formData.append(`showOffPic_${i}`, picFile);
        })
        formData.append("userData", JSON.stringify({...props.userInfos}));
        const loggedInUserState = await axios.post(`${backendUrl}/register`, formData);
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