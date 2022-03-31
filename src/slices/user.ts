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
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
