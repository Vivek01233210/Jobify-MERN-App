// Description: Middleware to check if the user is an admin or not.

import { UnauthorizedError } from "../utils/customError.js";

export const isAdmin = async (req, res, next) => {
    if(req.user.role !== 'admin'){
        throw new UnauthorizedError('Not authorized to access this route');
    }
    next();
}