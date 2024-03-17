package com.bridgelabz.addressbook.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.addressbook.model.Contact;
import com.bridgelabz.addressbook.response.Response;
import com.bridgelabz.addressbook.service.AddressBookService;
import com.bridgelabz.addressbook.service.SequenceGeneratorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/addressbook")
@AllArgsConstructor
@Tag(name = "AddressBookController", description = "To perform operations in address book")
public class AddressBookController {
	@Autowired
	AddressBookService services;
	
	@Autowired
	private SequenceGeneratorService sequenceGenerator;

	@Operation(
			summary = "POST operation in address book",
			description = "It is used to save contact details in address book")
	@PostMapping("/create")
	private ResponseEntity<Response> createData(@RequestBody Contact contact) {
		contact.setId(sequenceGenerator.generateSequence(Contact.SEQUENCE_NAME));
		Response response = services.createContact(contact);
		return new ResponseEntity<Response>(response, HttpStatus.OK);
	}
	
	@Operation(
			summary = "GET operation in address book",
			description = "It is used to get all contact details from address book")
	@GetMapping(value = { "", "/", "/get" })
	public ResponseEntity<List<Contact>> getContactsData() {
		List<Contact> list = new ArrayList<>();
		list = services.getAllContacts();
		if (!list.isEmpty()) {
			return new ResponseEntity<>(list, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@Operation(
			summary = "GET operation in address book",
			description = "It is used to get contact details of a particular person from the address book")
	@GetMapping("/getcontactbyid/{id}")
	public Contact getContactById(@PathVariable String id) {
		return services.getContact(id);
	}
	
	@Operation(
			summary = "PUT operation in address book",
			description = "It is used to update contact details in address book")
	@PutMapping("/update/{id}")
    public ResponseEntity<String> updateContact(@PathVariable String id, @RequestBody Contact contact) {
        services.updateContactDetails(id, contact);
        return ResponseEntity.ok("Contact updated successfully.");
    }
	
	@Operation(
			summary = "DELETE operation in address book",
			description = "It is used to delete all contacts from the address book")
	@DeleteMapping("/delete")
	public String deleteAllEmployee(){	
		services.deleteAllContacts();
		return "All Contacts Deleted successfully.";
	}
	
	@Operation(
			summary = "POST operation in address book",
			description = "It is used to delete contact details in address book")
	@DeleteMapping("/deletecontactbyid/{id}")
	public String deleteEmployee(@PathVariable String id){	
		services.deleteById(id);
		return "Contact Deleted Successfully.";
	}
}
