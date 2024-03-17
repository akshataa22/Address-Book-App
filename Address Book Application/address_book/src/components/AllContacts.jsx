import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '../api/springapi';
import Contact from './Contact';

function AllContacts() {
  const [contacts, setContacts] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');

  const getAllContactsFromServer = () => {
    axios.get(`${base_url}/get`).then(
      (response) => {
        console.log(response.data);
      setContacts(response.data)
  },  (error) => {
      console.log(error);
    });
  };

  const removeContactbyId =(id)=>{
    setContacts(contacts.filter((c)=> c.id!== id));
}

  useEffect(() => {
    getAllContactsFromServer();
  }, []);

  return (    
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        {
          contacts.length > 0 ? contacts.map((item) => <Contact key={item.id} contact={item} update={removeContactbyId} />) : "No contacts in the list."
        }
      </div>
  );
}

export default AllContacts;