import Contact from "../../models/contact.js";

const indexContacts = async (req, res, next) => {
  const contactsList = await Contact.find();
  res.json(contactsList);
};

export { indexContacts };
