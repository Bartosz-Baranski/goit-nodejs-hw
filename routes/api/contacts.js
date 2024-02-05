import express from "express";

import authMidd from "../../middleweare/auth.middleweare.js";

import { indexContacts } from "../../controllers/contacts/listContact.js";
import { showContacts } from "../../controllers/contacts/findContact.js";
import { deleteContacts } from "../../controllers/contacts/removeContact.js";
import { contactToUpdate } from "../../controllers/contacts/updateContact.js";
import { addingContacts } from "../../controllers/contacts/addContact.js";
import { updateFavorite } from "../../controllers/contacts/favoriteChange.js";

export const router = express.Router();

router.get("/api/contacts", authMidd, indexContacts);
router.get("/api/contacts/:contactId", authMidd, showContacts);
router.post("/api/contacts", authMidd, addingContacts);
router.delete("/api/contacts/:contactId", authMidd, deleteContacts);
router.put("/api/contacts/:contactId", authMidd, contactToUpdate);
router.patch("/:id/favorite", authMidd, updateFavorite);
