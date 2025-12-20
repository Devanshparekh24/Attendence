const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next); // ✅ Correct arguments
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

export { asyncHandler };
