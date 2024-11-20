export interface NotificationState {
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    persistent: boolean;
}
export declare const showNotification: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    message: string;
    severity: "success" | "error" | "info" | "warning";
    persistent?: boolean;
}, "notification/showNotification">, clearNotification: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"notification/clearNotification">;
declare const _default: import("redux").Reducer<NotificationState>;
export default _default;
