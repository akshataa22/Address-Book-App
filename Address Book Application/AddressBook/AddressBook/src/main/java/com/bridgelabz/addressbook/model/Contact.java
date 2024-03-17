package com.bridgelabz.addressbook.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="contacts")
public class Contact {
	@Transient
	public static final String SEQUENCE_NAME="user_sequence";
			
	@Id
	private String id;
	@NotNull(message = "Please provide first Name")
    @NotEmpty(message = "Please provide first Name")
    @Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9-]*$", message = "first name must be alphanumeric and start with character")
	private String firstName;
	@NotNull(message = "Please provide last Name")
    @NotEmpty(message = "Please provide last Name")
    @Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9-]*$", message = "last name must be alphanumeric and start with character")
	private String lastName;
	private String address;
	@NotNull(message = "Please provide phone number")
	@NotEmpty(message = "Please provide phone number")
	private long phoneNumber;
	private String email;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Kolkata")
	private LocalDateTime createdDateAndTime;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Kolkata")
	private LocalDateTime modifiedDateAndTime;
	
	public Contact(String firstName, String lastName,String address, long phoneNumber,String email) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.email = email;
	}
	
	public Contact() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDateTime getCreatedDateAndTime() {
		return createdDateAndTime;
	}

	public void setCreatedDateAndTime(LocalDateTime createdDateAndTime) {
		this.createdDateAndTime = createdDateAndTime;
	}

	public LocalDateTime getModifiedDateAndTime() {
		return modifiedDateAndTime;
	}

	public void setModifiedDateAndTime(LocalDateTime modifiedDateAndTime) {
		this.modifiedDateAndTime = modifiedDateAndTime;
	}

	@Override
	public String toString() {
		return "Contact [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", address=" + address
				+ ", phoneNumber=" + phoneNumber + ", email=" + email + ", createdDateAndTime=" + createdDateAndTime
				+ ", modifiedDateAndTime=" + modifiedDateAndTime + "]";
	}	
}
