export const successRes = (res, statusCode, message, data) => {
    return res.status(statusCode).json({ message, data });
};