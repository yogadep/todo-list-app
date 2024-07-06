export const errorHandler = (err, req, res, next) => {
    // console.error(err.stack); 
    
    res.status(err.status || 500).json({
        error: {
            message: "An error occurred on the server.",
            detail: err.message
        },
    });
}