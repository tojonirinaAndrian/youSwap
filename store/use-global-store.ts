'use client';

import {userType} from '@/src/types/userProfilesType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import uuid from 'react-uuid';

interface useStoreProps {
	whereIsLoginRegisterPage: string,
	setWhereIsLoginRegisterPage : (arg0: string) => void,
	userProfile: userType,
	setUserProfile: (arg0: userType) => void,
	setNewToast: (type: "simple" | "error", content: string) => void,
	closeToast: (toastId: string) => void,
	openToasts: {
		id: string,
		toastOpen: boolean,
		toastCurrentType: "simple" | "error",
		toastContent: string
	}[],
	signupContentState: userType,
	confirmedPasswordOnSignup: string,
	setConfirmedPasswordOnSignup: (arg0: string) => void,
	setSignupContentState: (arg0: userType) => void,
	setSignupToZero: () => void,
	setProfileToZero: () => void,
	seeingProfile: userType,
	setSeeingProfile: (arg0: userType) => void
}

export const useGlobalStore = create<useStoreProps>() (
	persist (
		(set, get) => ({
			openToasts: [],
			whereIsLoginRegisterPage : 'signup',
			setNewToast: (type: "simple" | "error", content: string) => {
				const newId = uuid();
				const pushedOpenToasts = [...get().openToasts, {
					id: newId,
					toastOpen: true,
					toastContent: content,
					toastCurrentType: type
				}];
				set(() => {
					return {
						openToasts: pushedOpenToasts
					}
				})
				setTimeout (() => {
					const currentOpenToasts = [...get().openToasts];
					const newOpenToasts: {
						id: string,
						toastOpen: boolean,
						toastCurrentType: "simple" | "error",
						toastContent: string
					}[] = [];
					currentOpenToasts.map((toast) => {
						if (toast.id !== newId) {
							newOpenToasts.push(toast)
						}
					});
					set(() => {
						return {
							openToasts: newOpenToasts
						}
					})
				}, 5000)
			},
			closeToast: (toastId: string) => {
				const currentOpenToasts = [...get().openToasts];
				const newOpenToasts: {
					id: string,
					toastOpen: boolean,
					toastCurrentType: "simple" | "error",
					toastContent: string
				}[] = [];
				currentOpenToasts.map((toast) => {
					if (toast.id !== toastId) {
						newOpenToasts.push(toast)
					}
				});
				set(() => {
					return {
						openToasts: newOpenToasts
					}
				})
			},
			setWhereIsLoginRegisterPage : (text: string) => {
				set(() => {
					return { whereIsLoginRegisterPage: text };
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
				id: '',
				email: "",
						
				fullName: "",
				pseudo: "",
				age: 10,
				gender: "male",
						
				currentPoints: 0,
				accumulatedPoints: 0,
				level: 0,
				evolutionStatus: "Noob",
				titleColor: "blue",
				profilePicture: "",
				profileDescription: "",
						
				availablility: "Both",
				generalRate: 0,
				doneAppointmentsNumber: 0,
						
				choosedLearningSkills :[],
				choosedTeachingSkills: [],
				createdAt: new Date(),
				updateAt: new Date(),
						
				asInvitedAppointmentsIds: [],
				asInvitorAppointmentsIds: [],
						
				asInvitedConversationIds: [],
				asInvitorConversationIds: [],
				blockedUsersIds: [],
				blockedByIds: [],
						
				notificationsIds: [],
				pictures: [],
				portfolioVideo: "",
				portfolioLinks : []
			},
			setUserProfile : (arg0: userType) => {
				set(() => {
					return { userProfile : arg0 };
				})
			},
			signupContentState: {
				id: '',
				email: "",
				
				fullName: "",
				pseudo: "",
				age: 10,
				gender: "male",

				currentPoints: 0,
				accumulatedPoints: 0,
				level: 0,
				evolutionStatus: "Noob",
				titleColor: "blue",
				profilePicture: "",
				profileDescription: "",

				availablility: "Both",
				generalRate: 0,
				doneAppointmentsNumber: 0,
				
				choosedLearningSkills :[],
				choosedTeachingSkills: [],
				createdAt: new Date(),
				updateAt: new Date(),

				asInvitedAppointmentsIds: [],
				asInvitorAppointmentsIds: [],

				asInvitedConversationIds: [],
				asInvitorConversationIds: [],
				blockedUsersIds: [],
				blockedByIds: [],

				notificationsIds: [],
				pictures: [],
				portfolioVideo: "",
				portfolioLinks : []
			},
			setSignupContentState : (arg0: userType) => {
				set(() => {
					return { signupContentState : arg0 };
				})
			},
			seeingProfile: {
				id: '',
				email: "",
				
				fullName: "",
				pseudo: "",
				age: 10,
				gender: "male",

				currentPoints: 0,
				accumulatedPoints: 0,
				level: 0,
				evolutionStatus: "Noob",
				titleColor: "blue",
				profilePicture: "",
				profileDescription: "",

				availablility: "Both",
				generalRate: 0,
				doneAppointmentsNumber: 0,
				
				choosedLearningSkills :[],
				choosedTeachingSkills: [],
				createdAt: new Date(),
				updateAt: new Date(),

				asInvitedAppointmentsIds: [],
				asInvitorAppointmentsIds: [],

				asInvitedConversationIds: [],
				asInvitorConversationIds: [],
				blockedUsersIds: [],
				blockedByIds: [],

				notificationsIds: [],
				pictures: [],
				portfolioVideo: "",
				portfolioLinks : []
			},
			setSeeingProfile : (arg0: userType) => {
				set(() => {
					return { seeingProfile : arg0 };
				})
			},
			confirmedPasswordOnSignup: "",
			setConfirmedPasswordOnSignup(arg0: string) {
				set(() => {
					return { confirmedPasswordOnSignup : arg0 }
				})
			},
			setSignupToZero : () => {
				set(() => {
					return {
						signupContentState: {
							id: '',
							email: "",
									
							fullName: "",
							pseudo: "",
							age: 10,
							gender: "male",
									
							currentPoints: 0,
							accumulatedPoints: 0,
							level: 0,
							evolutionStatus: "Noob",
							titleColor: "blue",
							profilePicture: "",
							profileDescription: "",
									
							availablility: "Both",
							generalRate: 0,
							doneAppointmentsNumber: 0,
									
							choosedLearningSkills :[],
							choosedTeachingSkills: [],
							createdAt: new Date(),
							updateAt: new Date(),
									
							asInvitedAppointmentsIds: [],
							asInvitorAppointmentsIds: [],
									
							asInvitedConversationIds: [],
							asInvitorConversationIds: [],
							blockedUsersIds: [],
							blockedByIds: [],
									
							notificationsIds: [],
							pictures: [],
							portfolioVideo: "",
							portfolioLinks : []
						}
					}
				})
			},
			setProfileToZero: () => {
				set(() => {
					return {
						userProfile: {
							id: '',
							email: "",
									
							fullName: "",
							pseudo: "",
							age: 10,
							gender: "male",
									
							currentPoints: 0,
							accumulatedPoints: 0,
							level: 0,
							evolutionStatus: "Noob",
							titleColor: "blue",
							profilePicture: "",
							profileDescription: "",
									
							availablility: "Both",
							generalRate: 0,
							doneAppointmentsNumber: 0,
									
							choosedLearningSkills :[],
							choosedTeachingSkills: [],
							createdAt: new Date(),
							updateAt: new Date(),
									
							asInvitedAppointmentsIds: [],
							asInvitorAppointmentsIds: [],
									
							asInvitedConversationIds: [],
							asInvitorConversationIds: [],
							blockedUsersIds: [],
							blockedByIds: [],
									
							notificationsIds: [],
							pictures: [],
							portfolioVideo: "",
							portfolioLinks : []
						}
					}
				})
			}
		}), {
			name : 'global'
		}
	)
)