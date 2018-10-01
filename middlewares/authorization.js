const checkAuth = (redisClient) => (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('Unauthorized');
    }

    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(401).json('Unauthorized');
        }
        // calls next middleware/logic
        return next();
    })
};

module.exports = {
    checkAuth
};
