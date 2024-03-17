import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import base_url from '../api/springapi';
import { Button, FormGroup, Form } from 'reactstrap';
import logo from './../images/logo.png';
import './../styling/header.css'
import './../styling/form.css'

const AddContact = () => {
    useEffect(()=>{
        document.title = "Add Contact Details";
    },[])

    const [contactDetails, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    postDataOnServer(contactDetails); 
  };

  const handleReset = () => {
    setFormData({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: ''
    });
    setError('');
    setSuccess('');
  };

  const postDataOnServer = (data) => {
    axios.post(`${base_url}/create`, data).then(
        (response) => {
          setSuccess('Contact Details added successfully.');
          setError('');
          console.log(response.data);
    },  (error) => {
          setError('Contact with same name already exists. Please Try Again....');
          setSuccess('');
          console.log('Error adding contact', error);
    })
  }

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    setFormData({ ...contactDetails, [e.target.name]: e.target.value});
  };

  return (
    <Fragment>
    <div className='headerStyle'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Company Logo" className='logoStyle' />
            <h1 style={{ color: "white", margin: 0 }}>Address Book Application</h1>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <a href="/" style={{ color: "white", marginTop: 50, height: 30, width: 125 }}>Home</a>
          </div>
        </div>
      </div>

      <h1 style={{ textAlign: "center",marginRight: 60 , marginTop: 35, marginBottom:30 }}>Add Contact Details</h1>
      <Form  className="customForm" onSubmit={handleSubmit}>
      <FormGroup className="customFormGroup">
          <label htmlFor="firstName">First Name: </label>
          <input className="border" type="text" placeholder="Enter your first name here" name="firstName" id="firstName"  required onChange={ handleChange} />
      </FormGroup>
      <FormGroup className="customFormGroup">
          <label htmlFor="lastName">Last Name: </label>
          <input className="border" type="text" placeholder="Enter your last name here" name="lastName" id="lastName"  required onChange={ handleChange} />
      </FormGroup>
      <FormGroup className="customFormGroup">
          <label htmlFor="address">Address: </label>
          <textarea className="border" placeholder=" Enter your address here" name="address" id="address"  required onChange={ handleChange} style={{ height: "100px" }} />
      </FormGroup>
        <FormGroup className="customFormGroup">
          <label htmlFor="salary">Phone Number: </label>
          <input style={{marginRight: 17}} className="border" type="text" placeholder="Enter your phone number here" name="phoneNumber" id="phoneNumber" onChange={handleChange} pattern="[0-9]{10}" title="Please enter a 10-digit phone number"/>
        </FormGroup>
        <FormGroup className="customFormGroup">
          <label htmlFor="email">Email: </label>
          <input className="border" style={{width:553}} type="email" placeholder="Enter your email id here" name="email" id="email"  required onChange={ handleChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
        </FormGroup>
        <div >   
        {success && ( <div className="message success-message"> <p>{success}</p> </div> )}
        {error && ( <div className="message error-message"> <p>{error}</p> </div> )}
          <Button style={{ marginLeft: 300, height:35, width:80 }}  className="submit-button" type="submit">Submit</Button>
          <Button style={{ marginLeft: 10, height:35,  width:80, backgroundColor:'darkgrey' }} type="reset" onClick={handleReset}>Reset</Button>
       </div>
      </Form>
    </Fragment>
  )
}

export default AddContact; 