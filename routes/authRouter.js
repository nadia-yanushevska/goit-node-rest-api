import express from "express";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import {
    authEmailSchema,
    authRegisterSchema,
    authSigninSchema,
} from "../schemas/authSchema.js";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    isEmptyBody,
    validateBody(authRegisterSchema),
    authControllers.register
);

authRouter.get("/verify/:verificationCode", authControllers.verify);

authRouter.post(
    "/verify",
    isEmptyBody,
    validateBody(authEmailSchema),
    authControllers.resendEmail
);

authRouter.post(
    "/login",
    isEmptyBody,
    validateBody(authSigninSchema),
    authControllers.login
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;
