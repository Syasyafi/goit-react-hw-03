import React, { Component, useState, useEffect } from "react";

import "./App.css";

import ContactList from "./ContactList/ContactList";

import SearchBox from "./SearchBox/SearchBox";

import ContactForm from "./ContactForm/ContactForm";

import initialContacts from "../initialContacts.json";

const getStoredContacts = () => {
  const StoredContacts = localStorage.getItem("contacts");
  return StoredContacts ? JSON.parse(StoredContacts) : initialContacts;
};

function App() {
  const [contacts, setContacts] = useState(getStoredContacts);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, newContact];
    });
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleDeleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="title">Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <SearchBox searchTerm={searchTerm} onSearchChange={handleSearch} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

export default App;
