import { HttpError } from "../../helpers/httpErrors/httpErrors.js";
import Contact from "../../models/contact.js";

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export { updateFavorite };
