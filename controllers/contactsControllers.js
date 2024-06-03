import HttpError from "../helpers/HttpError.js";
import {
    createContactSchema,
    updateContactSchema,
} from "../schemas/contactsSchemas.js";
import contactsService, { getContacts } from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    try {
        const result = await contactsService.getContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const result = await contactsService.getContactById(contactId);
        if (!result) {
            throw HttpError(404, `Movie with id=${contactId} not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const result = await contactsService.deleteContactById(contactId);
        if (!result) {
            throw HttpError(404, `Movie with id=${contactId} not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res) => {
    try {
        const { error } = createContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await contactsService.addContact(req.body);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res) => {
    try {
        const { error } = updateContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }

        const contactId = req.params.id;
        const result = await contactsService.updateContactById(
            contactId,
            req.body
        );
        if (!result) {
            throw HttpError(404, `Movie with id=${contactId} not found`);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};
