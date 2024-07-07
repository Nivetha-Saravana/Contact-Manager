
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { UseContact } from '../Context/ContactContext';

export const AddContacts = () => {
  const {
    showAddPage,
    setShowAddPage,
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
    addContact
  } = UseContact();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleSubmit = async () => {
    if (!name || !phone || !email) {
      setMessage('Empty Fields');
      console.log('Empty Fields');
      setTimeout(() => setMessage(''), 1000);
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Invalid Email');
      console.log('Invalid Email');
      setTimeout(() => setMessage(''), 1000);
      return;
    }

    if (!validatePhone(phone)) {
      setMessage('Invalid Number');
      console.log('Invalid Number');
      setTimeout(() => setMessage(''), 1000);
      return;
    }

    const newContact = { name, phone, email, image };

    try {
      await addContact(newContact);
      // Clear form after successful addition
      setName('');
      setPhone('');
      setEmail('');
      setImage(null);
      setShowAddPage(false);
    } catch (error) {
      console.error('There was an error adding the contact!', error);
      setMessage('Error adding contact');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleClose = () => {
    setShowAddPage(false);
    setName('');
    setPhone('');
    setEmail('');
    setImage(null);
    
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={`overlay ${showAddPage ? 'show' : ''}`}>
      <div className={`form : 'dark'}`}>
        <div className="top">
          <h1>Add Contact</h1>
          <button className="close" onClick={handleClose}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        {message && (
          <div className="message">
            <FontAwesomeIcon icon={faTriangleExclamation} /> {message}
          </div>
        )}
        <div className="bottom">
          <div className="inputGroup">
            <input
              type="text"
              required
              autoComplete="off"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="inputGroup">
            <input
              type="text" // Changed to "text" to avoid potential input type issues
              required
              autoComplete="off"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone">Phone No</label>
          </div>
          <div className="inputGroup">
            <input
              type="email"
              required
              autoComplete="off"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputGroup images">
            <input
              type="file"
              accept="image/*"
              autoComplete="off"
              id="image"
              onChange={handleImageChange}
            />
            <label htmlFor="image">Picture</label>
            {image && <img src={image} alt="Preview" className="image" />}
          </div>
        </div>
        <button className="add-contacts" onClick={handleSubmit}>Add Contact</button>
      </div>
    </div>
  );
};
