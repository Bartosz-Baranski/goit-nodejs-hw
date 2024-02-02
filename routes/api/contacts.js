import express from "express";

import { indexContacts } from "../../controllers/contacts/listContact.js";
import { showContacts } from "../../controllers/contacts/findContact.js";
import { deleteContacts } from "../../controllers/contacts/removeContact.js";
import { contactToUpdate } from "../../controllers/contacts/updateContact.js";
import { addingContacts } from "../../controllers/contacts/addContact.js";
import { updateFavorite } from "../../controllers/contacts/favoriteChange.js";

export const router = express.Router();

router.get("/api/contacts", indexContacts);
router.get("/api/contacts/:contactId", showContacts);
router.post("/api/contacts", addingContacts);
router.delete("/api/contacts/:contactId", deleteContacts);
router.put("/api/contacts/:contactId", contactToUpdate);
router.patch("/:id/favorite", updateFavorite);
