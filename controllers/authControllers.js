import bcrypt from "bcrypt";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";

import gravatar from "gravatar";

import sendEmail from "../helpers/sendEmail.js";
import { nanoid } from "nanoid";

const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await authServices.findUser({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    var url = gravatar.url(email, { s: "250" });
    const verificationCode = nanoid();

    const newUser = await authServices.signup({
        ...req.body,
        password: hashPassword,
        avatarURL: "https:" + url,
        verificationCode,
    });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationCode}">Verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    });
};

const verify = async (req, res) => {
    const { verificationCode } = req.params;
    const user = await authServices.findUser({ verificationCode });
    if (!user) {
        throw HttpError(404, "Email not found or already verify");
    }

    await authServices.updateUser(
        { _id: user._id },
        { verified: true, verificationCode: "" }
    );

    res.json({
        message: "Email verify success",
    });
};

const resendEmail = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(404, "Email not found");
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationCode}">Verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent",
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password wrong");
    }
    if (!user.verified) {
        throw HttpError(401, "Verify email first");
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
    verify: ctrlWrapper(verify),
    resendEmail: ctrlWrapper(resendEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
};
