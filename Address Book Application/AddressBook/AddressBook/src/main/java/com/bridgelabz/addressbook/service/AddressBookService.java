package com.bridgelabz.addressbook.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgelabz.addressbook.exception.ContactAlreadyExistsException;
import com.bridgelabz.addressbook.exception.ContactNotFoundException;
import com.bridgelabz.addressbook.model.Contact;
import com.bridgelabz.addressbook.repository.ContactRepository;
import com.bridgelabz.addressbook.response.Response;

@Service
public class AddressBookService {
	@Autowired
	ContactRepository repository;
	
	public Response createContact(Contact contact){
		Contact existingEmployee = repository.findByFirstNameAndLastName(contact.getFirstName(), contact.getLastName());
	    if (existingEmployee != null) {
	        throw new ContactAlreadyExistsException("Contact with name " + contact.getFirstName() + contact.getLastName() + " already exists.");
	    }
	    contact.setCreatedDateAndTime(LocalDateTime.now(ZoneId.of("Asia/Kolkata")));
		repository.save(contact);
		Response response = new Response();
		response.setCode(200);
		response.setMessage("Contact data Saved Sucessfully");
		return response;
	}
	
	public List<Contact> getAllContacts() {
		 return repository.findAll();
	}
	
	public Contact getContact(String id) {
		Contact c = repository.findById(id).orElseThrow(() -> new ContactNotFoundException("Contact not found with id: " + id));
		return c;
	}
	
	public Contact updateContactDetails(String id, Contact contact) {
		Contact c = repository.findById(id).orElseThrow(() -> new ContactNotFoundException("Contact not found with id: " + id));
	    contact.setModifiedDateAndTime(LocalDateTime.now(ZoneId.of("Asia/Kolkata")));
		c.setFirstName(contact.getFirstName());
		c.setLastName(contact.getLastName());
		c.setAddress(contact.getAddress());
		c.setPhoneNumber(contact.getPhoneNumber());
		c.setEmail(contact.getEmail());
		c.setModifiedDateAndTime(contact.getModifiedDateAndTime());
		return repository.save(c);
	}
	
	public void deleteAllContacts() {
		
		repository.deleteAll();
	}
	
	public void deleteById(String id) {
		Optional<Contact> existingContact = repository.findById(id);
		if (!existingContact.isPresent()) {
            throw new ContactNotFoundException("Contact with Id " + id + " not found in the Address Book.");
        }
		repository.deleteById(id);
	}

	/*
	 * public Response pinTheContact(String id) { Contact contact =
	 * repository.findById(id).orElseThrow(() -> new
	 * ContactNotFoundException("Contact not found with id: " + id));
	 * contact.setPinned(true); repository.save(contact); Response response = new
	 * Response(); response.setCode(200);
	 * response.setMessage("Contact data pinned Successfully"); return response; }
	 */
}