import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

function updateContacts(contacts) {
    fs.writeFile(contactsPath, JSON.stringify(contacts));
}

export async function getContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export async function getContactById(id) {
    const contacts = await getContacts();
    const res = contacts.find((contact) => contact.id === id);
    return res || null;
}

export async function addContact(data) {
    const contacts = await getContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

export async function deleteContactById(id) {
    const contacts = await getContacts();
    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx === -1) return null;
    const [res] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return res;
}
