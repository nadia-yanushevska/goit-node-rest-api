import bcrypt from "bcrypt";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";

import gravatar from "gravatar";

const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await authServices.findUser({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    var url = gravatar.url(email, { s: "250" });

    const newUser = await authServices.signup({
        ...req.body,
        password: hashPassword,
        avatarURL: "https:" + url,
    });

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password wrong");
    }

    const { _id: id } = user;

    const payload = {
        id,
    };

    const token = createToken(payload);
    await authServices.updateUser({ _id: id }, { token });

    res.json({
        token,
    });
};

const getCurrent = (req, res) => {
    const { username, email } = req.user;

    res.json({
        username,
        email,
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await authServices.updateUser({ _id }, { token: "" });

    res.status(204).json();
};

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
};
