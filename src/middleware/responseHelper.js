export const successRes = (res, statusCode, message, data) => {
    return res.status(statusCode).json({ message, data });
};

export const errorRes = (res, statusCode, message) => {
    return res.status(statusCode).json({ message })
}