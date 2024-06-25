import express from "express";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import userController from "../controllers/userController.js";

const usersRouter = express.Router();

usersRouter.patch(
    "/avatars",
    authenticate,
    upload.single("avatar"),
    userController.avatarUpdate
);

export default usersRouter;
