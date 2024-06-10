import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const isValidId = async (res, req, next) => {
    const id = res.params.id;
    if (!isValidObjectId(id))
        return next(HttpError(404, `ID ${id} is not valid`));
    next();
};

export default isValidId;
