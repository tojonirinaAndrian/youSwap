'use client';

import profileInterface from '@/src/types/userProfilesType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useStoreProps {
	whereIsLoginRegisterPage: string;
	isLoggedIn: boolean;
	setWhereIsLoginRegisterPage : (arg0: string) => void;
	toogleLoggedIn: () => void;
	userProfile: profileInterface;
	setUserProfile: (arg0: profileInterface) => void;
}

export const useGlobalStore = create<useStoreProps>() (
	persist (
		(set, get) => ({
			whereIsLoginRegisterPage : 'signUp',
			isLoggedIn: false,
			setWhereIsLoginRegisterPage : (text: string) => {
				set(() => {
					return { whereIsLoginRegisterPage : text };
				})
			},
			toogleLoggedIn: () => {
				set((state) => {
					return {
						isLoggedIn: !state.isLoggedIn
					};
				})
			},
			goBackLoginRegister: (text: string) => {
				set(() => {
					return {
						whereIsLoginRegisterPage: text
					}
				})
			},
			userProfile: {
				id: '1',
				fullName: "Tojonirina Andrianjafiniaina",
				pseudo: "Tj-san",
				profilePictureLink: "",
				helpedPeople: 0,
				level: 0,
				title: "Noob",
				titleColor: "blue",
				currentPoints: 0,
				accumulatedPoints: 0,
				leftPointsForNextLevel: 100,
				description: "Someone puts his favorite quote here.",
				skills: {
					learnSkills: [
						{ name: "Pastry", level: "beginner", skillId: "1" },
						{ name: "Piano", level: "beginner", skillId: "2"}
					], 
					teachSkills : [
						{ name: "React Dev", level: "advanced" , skillId: "1"},
						{ name: "Basketball", level: "advanced", skillId: "2" },
						{ name: "Drawing", level: "intermediate", skillId: "3" }
					]
				},
				pictures: [""],
				portfolioVideoLink: "",
				portfolioLinks : [
					{ label: "Facebook", link: "www.facebook.com", linkId: "1" },
					{ label: "Portfolio Website", link: "www.thisisthelink.com", linkId: "2" }
				]
			},
			setUserProfile : (arg0: profileInterface) => {
				set(() => {
					return { userProfile : arg0 };
				})
			},
		}), {
			name : 'global'
		}
	)
)