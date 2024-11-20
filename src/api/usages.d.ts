export declare const validatePost: (params?: {}, config?: {}) => Promise<number>;
export declare const getOrigins: (pagination?: {
    page: number;
    size: number;
}, config?: {}) => Promise<any>;
export declare const createOrigin: (origin: string[], config?: {}) => Promise<any>;
export declare const deleteOrigin: (originId: number) => Promise<any>;
