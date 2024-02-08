import HttpError  from "../../helpers/httpErrors/httpErrors.js";
import Contact from "../../models/contact.js";

const showContacts = async (req, res, next) => {
  const { contactId } = req.params;

  const findContact = await Contact.findById(contactId);
  if(!findContact){
    throw HttpError(404, "Not found contact ")
  }
  res.json(findContact)
};

export { showContacts };
