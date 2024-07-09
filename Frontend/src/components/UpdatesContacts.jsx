import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { UseContact } from "../Context/ContactContext";

export const UpdateContacts = () => {
  const {
    showEditPage,
    darkMode,
    editingContactId,
    stopEditingContact,
    updateContact,
    contactInfos,
    message,
    setMessage,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    image,
    setImage,
    handleImageChange,
  } = UseContact();

  useEffect(() => {
    const contact = contactInfos.find((c) => c._id === editingContactId);
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
      setImage(contact.image);
    }
  }, [editingContactId, contactInfos, setName, setPhone, setEmail, setImage]);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      setMessage(
        <span>
          <FontAwesomeIcon icon={faTriangleExclamation} /> All fields are required.
        </span>
      );
      setTimeout(() => setMessage(""), 1000);
      return;
    }

    if (!validateEmail(email)) {
      setMessage(
        <span>
          <FontAwesomeIcon icon={faTriangleExclamation} /> Invalid email address.
        </span>
      );
      setTimeout(() => setMessage(""), 1000);
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setMessage(
        <span>
          <FontAwesomeIcon icon={faTriangleExclamation} /> Invalid phone number.
        </span>
      );
      setTimeout(() => setMessage(""), 1000);
      return;
    }

    const updatedContact = { _id: editingContactId, name, email, phone, image };
    try {
      await updateContact(updatedContact);
      handleClose(); // Close the form immediately after successful update
    } catch (error) {
      console.error("There was an error updating the contact!", error);
      setMessage(
        <span>
          <FontAwesomeIcon icon={faTriangleExclamation} /> Error updating contact.
        </span>
      );
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleClose = () => {
    stopEditingContact(false);
    setName('');
    setPhone('');
    setEmail('');
    setImage(null);
    
  };

  if (!showEditPage) return null;

  return (
    <div className={`overlay-edit-page ${showEditPage ? "show" : ""}`}>
      <div className={`form ${darkMode ? "" : "light"}`}>
        <div className="top">
          <h1>Update Contact</h1>
          <button className="close" onClick={handleClose}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              required
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="inputGroup">
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
              required
            />
            <label htmlFor="phone">Phone No</label>
          </div>
          <div className="inputGroup">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputGroup images">
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
            />
            {image && <img src={image} alt="Preview" className="image" />}
            <label htmlFor="image">Picture</label>
          </div>
          <button type="submit" className="add-contacts">
            Update Contact
          </button>
          {message && (
            <div className="message">
              <FontAwesomeIcon icon={faTriangleExclamation} /> {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
