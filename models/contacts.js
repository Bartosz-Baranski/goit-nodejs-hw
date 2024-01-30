import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  try {
    let contacts = await listContacts();
    contacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    throw error;
  }
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await updateContact(contacts);
  return contacts[index];
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
