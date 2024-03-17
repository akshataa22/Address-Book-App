import React, { useState, useEffect, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import base_url from '../api/springapi';
import './../styling/form.css'

const UpdateContact = ({ contact, onUpdate }) => {
  useEffect(()=>{
    document.title = "Update Contact Details";
},[])

  const [updatedContact, setUpdatedContact] = useState(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact({ ...updatedContact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDataOnServer(updatedContact); 
  };

  
  const handleReset = () => {
    setUpdatedContact({
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      email: ''
    });
  };


  const updateDataOnServer = (updatedContact) => {
    axios.put(`${base_url}/update/${contact.id}`, updatedContact)
      .then((response) => {
        console.log("Contact details updated:", response.data);
        onUpdate(response.data);
      })
      .catch((error) => {
        console.error("Error updating contact details:", error);
      });
  };

  return (
    <Fragment>
    <h1 style={{textAlign:"center", marginBottom:60, marginTop:80}}>Update Contact Details</h1>
    <Form onSubmit={handleSubmit} className="update-form">
      <FormGroup className="form-group">
        <Label htmlFor="firstName">First Name:</Label>
        <Input type="text" name="firstName" id="firstName" value={updatedContact.firstName} onChange={handleChange} />
      </FormGroup>
      <FormGroup className="form-group">
        <Label htmlFor="lastName">Last Name:</Label>
        <Input type="text" name="lastName" id="lastName" value={updatedContact.lastName} onChange={handleChange} />
      </FormGroup>
      <FormGroup className="form-group">
        <Label htmlFor="address">Address:</Label>
        <Input type="textarea" name="address" id="address" value={updatedContact.address} onChange={handleChange} />
      </FormGroup>
      <FormGroup className="form-group">
        <Label htmlFor="phoneNumber">Phone Number:</Label>
        <Input type="text" name="phoneNumber" id="phoneNumber" value={updatedContact.phoneNumber} onChange={handleChange} />
      </FormGroup>
      <FormGroup className="form-group">
        <Label htmlFor="email">Email:</Label>
        <Input type="email" name="email" id="email" value={updatedContact.email} onChange={handleChange} />
      </FormGroup>
      <Button type="submit" style={{marginLeft:220, width:100, height:35, marginTop:20}}  className="submit-button">Update</Button>
      <Button style={{marginLeft:30, width:100, height:35, backgroundColor: 'darkgray'}} type="reset" onClick={handleReset}>Reset</Button>
    </Form>
    </Fragment>
  );
};

export default UpdateContact;