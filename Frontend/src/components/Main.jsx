import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UseContact } from "../Context/ContactContext";

export const Main = () => {
  const { setShowAddPage, contactInfos, searchTerm, deleteContact, darkMode, startEditingContact } = UseContact();

  useEffect(() => {
    // Example of setting up event listeners or other setup here
    return () => {
      // Cleanup code if needed
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handleShow = () => setShowAddPage(true);

  const handleDelete = async (id) => {
    console.log('Deleting contact with ID:', id); // Debug statement
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await deleteContact(id);
    }
  };

  const handleUpdate = (id) => startEditingContact(id);

  const filteredContacts = contactInfos.filter(
    (contact) => !searchTerm || contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`Main : "dark"}`}>
      {!filteredContacts || filteredContacts.length === 0 ? (
        <div className="no-contacts">
          <img
            src="/Nocontact.png"
            alt="No Contacts Available"
            className="img-nocontacts"
          />
          <h2>No Contacts Found</h2>
          <button className="add-contact" onClick={handleShow}>
            Add Contact
          </button>
        </div>
      ) : (
        <div className="contact-list-container">
          {filteredContacts.map((contactInfo) => (
            <div key={contactInfo._id}>
              <div className="contact-lists">
                <div>
                  {contactInfo.image ? (
                    <img
                      src={contactInfo.image}
                      alt="User"
                      style={{
                        width: "3rem", // Set the width to match the icon
                        height: "3rem", // Set the height to match the icon
                        borderRadius: "56%",
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      style={{ color: "#146aff" }}
                      className="user-icon"
                    />
                  )}
                </div>
                <div className="contact-info">
                  <h3 className="contact-name">{contactInfo.name}</h3>
                  <h2 className="contact-phone">{contactInfo.phone}</h2>
                  <h4 className="contact-email">{contactInfo.email}</h4>
                </div>
                <div className="edit-icons">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => handleUpdate(contactInfo._id)}
                    title="Edit Contact"
                  />
                  <br />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(contactInfo._id)}
                    title="Delete Contact"
                  />
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
