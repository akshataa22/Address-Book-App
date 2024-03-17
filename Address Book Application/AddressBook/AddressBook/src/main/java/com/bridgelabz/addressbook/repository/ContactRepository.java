package com.bridgelabz.addressbook.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bridgelabz.addressbook.model.Contact;

public interface ContactRepository extends MongoRepository<Contact, String>{

	Contact findByFirstNameAndLastName(String firstName, String lastName);

}
