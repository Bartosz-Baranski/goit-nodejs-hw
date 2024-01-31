import express from "express";

import { indexContacts } from "../../controllers/listContact.js";
import { showContacts } from "../../controllers/findContact.js";
import { deleteContacts } from "../../controllers/removeContact.js";
import { contactToUpdate } from "../../controllers/updateContact.js";
import { addingContacts } from "../../controllers/addContact.js";

export const router = express.Router();

router.get("/api/contacts", indexContacts);
router.get("/api/contacts/:contactId", showContacts);
router.post("/api/contacts", addingContacts);
router.delete("/api/contacts/:contactId", deleteContacts);
router.put("/api/contacts/:contactId", contactToUpdate);
