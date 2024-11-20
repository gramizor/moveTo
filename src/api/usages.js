import axios from "./api";
export const validatePost = async (params = {}, config = {}) => {
    try {
        const response = await axios.post("/validate", null, { params, ...config });
        return response.status;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
export const getOrigins = async (pagination = { page: 0, size: 10 }, config = {}) => {
    try {
        const response = await axios.get("/origins", {
            ...config,
            params: {
                page: pagination.page,
                size: pagination.size,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching origins:", error);
        throw error;
    }
};
export const createOrigin = async (origin, config = {}) => {
    try {
        const response = await axios.post("/origin", { origin }, { ...config });
        return response.data;
    }
    catch (error) {
        console.error("Error creating origin:", error);
        throw error;
    }
};
export const deleteOrigin = async (originId) => {
    try {
        const response = await axios.delete(`/origins/${originId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting origin:", error);
        throw error;
    }
};
