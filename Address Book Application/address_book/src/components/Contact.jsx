import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import base_url from "../api/springapi";
import axios from "axios";
import Modal from "react-modal";
import UpdateContact from "./UpdateContact";

const Contact = ({ contact, update }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteContact = (id) => {
    axios
      .delete(`${base_url}/deletecontactbyid/${id}`)
      .then(
        (Response) => {
          console.log("Contact details deleted");
          update(id);
        },
        (error) => {
          console.log("Error deleting contact: " ,error);
        }
      );
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Table bordered className="tableBody">
        <tbody>
          <tr>
            <td>{contact.id}</td>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.address}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.email}</td>
            <Button style={{ textAlign:'center',backgroundColor: "darkgray" }} onClick={() => {deleteContact(contact.id);}}>Delete</Button>
            <Button style={{ textAlign:'center', backgroundColor: "Blue", color: "wheat", marginLeft: 5 }} onClick={openModal}>Update</Button>
          </tr>
        </tbody>
      </Table>
      <Modal isOpen={showModal} onRequestClose={closeModal}>
        <UpdateContact contact={contact} onUpdate={(updatedContact) => {
            update(updatedContact.id);
            closeModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default Contact;