import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ContactContext = createContext();

export const ContactContextProvider = ({ children }) => {
  const [contactInfos, setContactInfos] = useState([]);
  const [showAddPage, setShowAddPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showEditPage, setShowEditPage] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/contacts");
        setContactInfos(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const addContact = async (newContact) => {
    try {
      const response = await axios.post("http://localhost:5000/contacts", newContact);
      setContactInfos((prevContacts) => [...prevContacts, response.data]);
      resetForm();
      showSuccessMessage("Contact added successfully!");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const updateContact = async (updatedContact) => {
    try {
      const response = await axios.put(`http://localhost:5000/contacts/${updatedContact._id}`, updatedContact);
      setContactInfos((prevContacts) =>
        prevContacts.map((contact) => (contact._id === updatedContact._id ? response.data : contact))
      );
      showSuccessMessage("Contact updated successfully!");
      stopEditingContact();  // Ensure form closes after update
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this contact?")) {
        await axios.delete(`http://localhost:5000/contacts/${id}`);
        setContactInfos((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
        showSuccessMessage("Contact deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(
      <span>
        <FontAwesomeIcon icon={faCheckCircle} /> {message}
      </span>
    );
    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setImage(null);
    setShowAddPage(false);
    setShowEditPage(false);
  };

  const startEditingContact = (id) => {
    setEditingContactId(id);
    setShowEditPage(true);
  };

  const stopEditingContact = () => {
    setEditingContactId(null);
    setShowEditPage(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contactInfos,
        addContact,
        updateContact,
        showAddPage,
        setShowAddPage,
        searchTerm,
        setSearchTerm,
        successMessage,
        deleteContact,
        darkMode,
        setDarkMode,
        showEditPage,
        setShowEditPage,
        editingContactId,
        startEditingContact,
        stopEditingContact,
        name,
        setName,
        phone,
        setPhone,
        email,
        setEmail,
        image,
        setImage,
        handleImageChange,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const UseContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("UseContact must be used within a ContactProvider");
  }
  return context;
};
