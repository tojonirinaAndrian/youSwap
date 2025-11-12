'use client';

import userInterface from '@/src/types/userProfilesType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useStoreProps {
	whereIsLoginRegisterPage: string;
	isLoggedIn: boolean;
	setWhereIsLoginRegisterPage : (arg0: string) => void;
	toogleLoggedIn: () => void;
	userProfile: userInterface;
	setUserProfile: (arg0: userInterface) => void;
}

export const useGlobalStore = create<useStoreProps>() (
	persist (
		(set, get) => ({
			whereIsLoginRegisterPage : 'signup',
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
				email: "andrianjafiniaina21@gmail.com",
				
				fullName: "Tojonirina Andrianjafiniaina",
				pseudo: "Tj-san",
				age: 20,

				currentPoints: 0,
				accumulatedPoints: 0,
				level: 0,
				evolutionStatus: "Noob",
				titleColor: "blue",
				profilePicture: "",
				profileDescription: "Someone puts his favorite quote here.",

				availablility: "Both",
				generalRate: 0,
				doneAppointmentsNumber: 0,
				
				choosedLearningSkills :[
					{ 	
						id: "1", 
						proficiency: "Beginner",
						userId: "1",
						state: "UserIsLearning",
						skillItself: {
							id: "1",
							name: "Pastry",
							categoryName: "Art"
						}
					},
					{ 	
						userId: "1",
						id: "2", 
						proficiency: "Beginner",
						state: "UserIsLearning",
						skillItself: {
							id: "2",
							name: "Piano",
							categoryName: "Art"
						}
					}
				],
				choosedTeachingSkills: [
					{ 	
						id: "3",
						userId: "1",
						proficiency: "Advanced",
						state: "UserIsTeaching",
						skillItself: {
							id: "3",
							name: "React Dev",
							categoryName: "Coding"
						}
					},
					{ 	
						id: "4", 
						userId: "1",
						proficiency: "Advanced",
						state: "UserIsTeaching",
						skillItself: {
							id: "4",
							name: "Basketball",
							categoryName: "Sport"
						}
					},
					{ 	
						id: "5", 
						userId: "1",
						proficiency: "Intermediate",
						state: "UserIsTeaching",
						skillItself: {
							id: "5",
							name: "Drawing",
							categoryName: "Art"
						}
					}
				],
				createdAt: new Date(),
				updateAt: new Date(),

				asInvitedAppointmentsIds: [],
				asInvitorAppointmentsIds: [],

				asInvitedConversationIds: [],
				asInvitorConversationIds: [],
				blockedUsersIds: [],
				blockedByIds: [],

				notificationsIds: [],
				pictures: [""],
				portfolioVideo: "",
				portfolioLinks : [
					{ label: "Facebook", link: "www.facebook.com", id: "1" },
					{ label: "Portfolio Website", link: "www.thisisthelink.com", id: "2" }
				]
			},
			setUserProfile : (arg0: userInterface) => {
				set(() => {
					return { userProfile : arg0 };
				})
			},
		}), {
			name : 'global'
		}
	)
)