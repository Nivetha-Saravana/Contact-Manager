import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import { Main } from './Main';


export const Home = () => {
  const [setContacts] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('There was an error fetching the contacts!', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      <Header />
      <Main /> 
    </>
  );
};
