import { updateContact } from "../../goit-nodejs-hw/models/contacts.js";
import { contactSchema } from "./validation.js";

async function contactToUpdate(req, res, next) {
  const { contactId } = req.params;
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedContact = await updateContact(contactId, req.body);

    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

export { contactToUpdate };
