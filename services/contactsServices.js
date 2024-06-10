import Contact from "../models/Contact.js";
// const contactsPath = path.resolve("db", "contacts.json");

// async function updateContacts(contacts) {
//     fs.writeFile(contactsPath, JSON.stringify(contacts));
// }

export async function getContacts() {
    return Contact.find();
}

async function getContactById(id) {
    return Contact.findOne({ _id: id });
}

async function addContact(data) {
    return Contact.create(data);
}

async function updateContactById(id, data) {
    return Contact.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
}

async function updateStatusContact(id, data) {
    return Contact.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
}

async function deleteContactById(id) {
    return Contact.findByIdAndDelete(id);
}

export default {
    getContacts,
    getContactById,
    addContact,
    deleteContactById,
    updateContactById,
    updateStatusContact,
};
