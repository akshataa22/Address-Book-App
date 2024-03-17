import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import Header from './components/Header';
import AddContact from './components/AddContact';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';
import AllContacts from './components/AllContacts';

function App() {
  return (
      <div>  
        <Router>
          <ToastContainer/>
          <Container>
            <AppRouter />
          </Container>
        </Router>
      </div>
    );
  }
  
  const AppRouter = () => {
    const location = useLocation();
  
    return (
      <>
        {location.pathname === '/' && <Header />}
        <Routes>
          <Route path="/add" element={<AddContact />} />
          <Route path="/" element={<AllContacts />} />
        </Routes>
      </>
    );
  };
  
  export default App; 