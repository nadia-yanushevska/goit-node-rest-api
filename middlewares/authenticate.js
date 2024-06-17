import HttpError from "../helpers/HttpError.js";

import { verifyToken } from "../helpers/jwt.js";

import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(HttpError(401, "Not Authorized"));
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        return next(HttpError(401, "Invalid token"));
    }

    const { error, payload } = verifyToken(token);
    if (error) {
        return next(HttpError(401, error.message));
    }
    const { id } = payload;
    const user = await findUser({ _id: id });
    if (!user) {
        return next(HttpError(401, "Invalid token"));
    }

    if (!user.token) {
        return next(HttpError(401, "Token expired"));
    }

    req.user = user;

    next();
};

export default authenticate;
