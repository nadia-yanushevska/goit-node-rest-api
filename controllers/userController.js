import * as userServices from "../services/userServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";

import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

const avatarDir = path.resolve("public", "avatars");

const avatarUpdate = async (req, res) => {
    const { _id } = req.user;

    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarDir, filename);
    Jimp.read(oldPath)
        .then((lenna) => {
            return lenna.resize(250, 250).write(newPath);
        })
        .catch((err) => {
            throw HttpError(400, "Bad request");
        });
    const avatar = path.join("avatars", filename);

    await userServices.updateUser({ _id }, { avatarURL: avatar });

    res.status(200).json({ avatarURL: avatar });
};

export default {
    avatarUpdate: ctrlWrapper(avatarUpdate),
};
