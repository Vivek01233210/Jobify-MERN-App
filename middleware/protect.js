import { unauthenticatedError } from "../utils/customError.js";
import { verifyToken } from "../utils/JWTUtils.js";


export const protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) throw new unauthenticatedError('Not authenticated, no token provided');

    try {
        const {userId, role} = verifyToken(token)
        req.user = {userId, role}
        next();
    } catch (error) {
        throw new unauthenticatedError('Not authenticated, token failed');
    }
}