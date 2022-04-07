import { createSlice } from '@reduxjs/toolkit';

export interface ScheduleType {
	id: string;
	sname: string;
	start: string;
	end: string;
}
interface stateType {
	data: ScheduleType[];
}

const initialState: stateType = {
	data: [],
};
const scheduleSlice = createSlice({
	name: 'schedule',
	initialState,
	reducers: {
		setData: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { setData } = scheduleSlice.actions;

export default scheduleSlice.reducer;
