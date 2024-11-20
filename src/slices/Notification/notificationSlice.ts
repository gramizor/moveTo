// notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    persistent: boolean;
}

const initialState: NotificationState = {
    message: '',
    severity: 'info',
    persistent: false,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (
            state,
            action: PayloadAction<{ message: string; severity: 'success' | 'error' | 'info' | 'warning'; persistent?: boolean }>
        ) => {
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
