import HttpError from "../../helpers/httpErrors/httpErrors.js";
import Contact from "../../models/contact.js";

const addingContacts = async (req, res) => {
  const addContact = await Contact.create(req.body);
  res.status(201).json(addContact);
  if (!addContact) {
    throw HttpError(404, "Can`t add");
  }
  res.json(addContact);
};

export { addingContacts };
