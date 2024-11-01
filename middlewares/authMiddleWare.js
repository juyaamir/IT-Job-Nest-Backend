import jwt from 'jsonwebtoken';

// Middleware to verify the JWT and attach the user ID to req.user
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['Authorization'];
    if (!token) {
        return res.status(401).send({ message: 'Access Denied' });
    }
    try {
        const actualToken = token.split(' ')[1];
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token' });
    }
};