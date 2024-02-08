import  HttpError  from "../../helpers/httpErrors/httpErrors.js";
import Contact from "../../models/contact.js";

const deleteContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndDelete(contactId);
  if (!deleteContact) {
    throw HttpError(404, "Not found contact to remove");
  }
  res.json({ message: "Contact deleted" });
};

export { deleteContacts };
