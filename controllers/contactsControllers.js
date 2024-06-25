import HttpError from "../helpers/HttpError.js";
import {
    createContactSchema,
    statusContactSchema,
    updateContactSchema,
} from "../schemas/contactsSchemas.js";
import contactsService, { getContacts } from "../services/contactsServices.js";
import getFilterWithOwnerId from "../helpers/getFilterWithOwnerId.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const filter = {
            owner,
        };
        const result = await contactsService.getContacts(filter);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const filter = getFilterWithOwnerId(req);
        const result = await contactsService.getContactById(filter);
        if (!result) {
            throw HttpError(404, `Not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const filter = getFilterWithOwnerId(req);
        const result = await contactsService.deleteContactById(filter);
        if (!result) {
            throw HttpError(404, `Not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;

        const { error } = createContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }

        const result = await contactsService.addContact({
            ...req.body,
            owner,
        });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const filter = getFilterWithOwnerId(req);
        const { error } = updateContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }

        const result = await contactsService.updateContactById(
            filter,
            req.body
        );
        if (!result) {
            throw HttpError(404, `Not found`);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const statusContact = async (req, res, next) => {
    try {
        const filter = getFilterWithOwnerId(req);
        const { error } = statusContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }

        const result = await contactsService.updateStatusContact(
            filter,
            req.body
        );
        if (!result) {
            throw HttpError(404, `Not found`);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};
