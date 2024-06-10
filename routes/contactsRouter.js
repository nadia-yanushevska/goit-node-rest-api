import express from "express";
import {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    statusContact,
} from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", isEmptyBody, createContact);

contactsRouter.put("/:id", isValidId, isEmptyBody, updateContact);

contactsRouter.put("/:id/favorite", isValidId, isEmptyBody, statusContact);

export default contactsRouter;
