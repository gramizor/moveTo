export declare const loadOrigins: import("@reduxjs/toolkit").AsyncThunk<{
    content: Origins[];
    totalPages: number;
}, {
    page: number;
    size: number;
}, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export interface Origins {
    id: number;
    origin: string;
}
export declare const setPage: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "origins/setPage">;
declare const _default: import("redux").Reducer<{
    origins: Origins[];
    pagination: {
        page: number;
        size: number;
        totalPages: number;
    };
    loading: boolean;
    error: string | null;
}>;
export default _default;
