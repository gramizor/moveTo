declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    notification: import("./Notification/notificationSlice").NotificationState;
    origins: {
        origins: import("./Origin/originSlice").Origins[];
        pagination: {
            page: number;
            size: number;
            totalPages: number;
        };
        loading: boolean;
        error: string | null;
    };
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        notification: import("./Notification/notificationSlice").NotificationState;
        origins: {
            origins: import("./Origin/originSlice").Origins[];
            pagination: {
                page: number;
                size: number;
                totalPages: number;
            };
            loading: boolean;
            error: string | null;
        };
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
