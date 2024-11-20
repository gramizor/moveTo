export const httpRegex =
    /^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const extractValidOrigins = (input: string): string[] => {
    return input
        .split("\n")
        .map((el) => el.trim())
        .filter((el) => el && httpRegex.test(el))
        .map((el) => el.replace(/['"]/g, "").trim());
};
