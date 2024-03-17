import React from 'react';
import { Table } from 'reactstrap';
import './../styling/header.css'
import logo from './../images/logo.png'
import './../styling/table.css'

function Header() {
  return (
    <header>
    <div className='headerStyle'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Company Logo" className='logoStyle' />
          <h1 style={{ color: "white", margin: 0 }}>Address Book Application</h1>
        </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <a href="/add" style={{ color: "white", marginTop: 50, height: 30, width: 120, marginRight: 0 }}>Add Contact</a>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ fontWeight: 'bold', color: '#1F2E11', marginRight: 30, textAlign:'center'}}>Contact Details</h2>
        <Table className='tableHeader'>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
        </Table>
      </div>
    </header>
  );
}

export default Header;