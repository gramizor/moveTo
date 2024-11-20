import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./Notification/notificationSlice";
import originsReducer from "./Origin/originSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    origins: originsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
