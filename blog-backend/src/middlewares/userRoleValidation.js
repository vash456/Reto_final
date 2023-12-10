const authorize = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const user = req.user;
            const userId = req.params.userId
            if (user && user.kind == requiredRole) {
                next();
            } else {
                if (userId == user.id) {
                    next();
                }else {
                    return res.status(403).send('Forbidden')
                }
            }
        } catch {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = authorize;