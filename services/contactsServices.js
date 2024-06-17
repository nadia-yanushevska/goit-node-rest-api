import Contact from "../models/Contact.js";

export async function getContacts(filter) {
    return Contact.find(filter);
}

async function getContactById(filter) {
    return Contact.findOne(filter);
}

async function addContact(data) {
    return Contact.create(data);
}

async function updateContactById(filter, data) {
    return Contact.findByIdAndUpdate(filter, data, {
        new: true,
        runValidators: true,
    });
}

async function updateStatusContact(filter, data) {
    return Contact.findByIdAndUpdate(filter, data, {
        new: true,
        runValidators: true,
    });
}

async function deleteContactById(filter) {
    return Contact.findByIdAndDelete(filter);
}

export default {
    getContacts,
    getContactById,
    addContact,
    deleteContactById,
    updateContactById,
    updateStatusContact,
};
