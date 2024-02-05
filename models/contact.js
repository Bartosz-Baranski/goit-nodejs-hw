import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = model("contact", contactSchema);

export default Contact;
