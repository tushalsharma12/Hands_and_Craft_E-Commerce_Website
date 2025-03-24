import Contact from "../models/Contact.js";

// ✅ Submit Contact Form
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ updatedAt: -1 });

    // Format response
    const formattedContacts = contacts.map((contact) => ({
      id: contact._id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
      createdAt: new Date(contact.createdAt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    res.status(200).json(formattedContacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};
