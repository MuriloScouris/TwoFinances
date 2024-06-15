import React from 'react';
import "./header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar  className='color1 bg-custom rounded-bottom shadow-sm' expand="sm">
        <Container>
          <Navbar.Brand ><Link to="/" className='nav-tittle'>TwoTimes</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav " />
          <Navbar.Collapse id="basic-navbar-nav"  >
            <Nav className="me-auto ">
              <Nav.Link as={Link} to="/" className='nav-link' >Home</Nav.Link>
              <Nav.Link as={Link} to="/financas">Finanças</Nav.Link>
              <Nav.Link as={Link} to="/todo">To Do</Nav.Link>
              <Nav.Link as={Link} to="/suporte">Suporte</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Header;
