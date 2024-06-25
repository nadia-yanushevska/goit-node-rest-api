import User from "../models/User.js";

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
