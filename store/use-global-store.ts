'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useStoreProps {
	whereIsLoginRegisterPage: string;
	isLoggedIn: boolean;
	setWhereIsLoginRegisterPage : (arg0: string) => void;
	toogleLoggedIn: () => void;
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
			}
		}), {
			name : 'global'
		}
	)
)