import { createSlice } from '@reduxjs/toolkit';

export interface userType {
	id: number;
	email: string;
	name: string;
	gender: string | null;
	dob: string | null;
	phone: string | null;
	profile_pic: string | null;
	role: string;
	address: string | null;
	city: string | null;
	state: string | null;
	zip: string | null;
	country: string | null;
}
interface stateType {
	userInfo: {} | userType;
	isLoggedIn: boolean;
}

const initialState: stateType = {
	userInfo: {},
	isLoggedIn: false,
};
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.userInfo = action.payload;
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.userInfo = {};
			state.isLoggedIn = false;
		},
		update: (state, action) => {
			state.userInfo = action.payload;
		},
	},
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
