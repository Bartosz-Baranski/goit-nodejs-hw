import { addContact } from "../../goit-nodejs-hw/models/contacts.js";
import { contactSchema } from "./validation.js";

async function addingContacts(req, res, next) {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newContact = await addContact(req.body);

    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

export { addingContacts };
