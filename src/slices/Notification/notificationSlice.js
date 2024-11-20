// notificationSlice.ts
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    message: '',
    severity: 'info',
    persistent: false,
};
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.persistent = action.payload.persistent ?? false;
        },
        clearNotification: (state) => {
            if (!state.persistent) {
                state.message = '';
                state.severity = 'info';
            }
        },
    },
});
export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
