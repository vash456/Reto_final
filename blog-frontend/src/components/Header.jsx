import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import blogLogo from '../assets/logo.svg';

const Header = ({ isLoggedIn=false, userName='Juan Carlos', handleLogout }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(username);
    console.log(password);
    console.log('He hecho login')
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);   
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  return (
    <Navbar className='bg-dark expand-lg'>
      <Container>
        <Navbar.Brand className='bg-dark'>
          <Link to='/'>
            <img
              alt="Logo"
              src={blogLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Crypto Blog
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-dark' />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className='mr-auto'>
            <Link to='/' style={{marginRight: '40px'}}>Artículos</Link>
          </Nav>
          <Form inline="true">
            {isLoggedIn ? (
              <NavDropdown 
                title={userName} 
                id='basic-nav-dropdown' 
                show = {dropdownOpen}
                onToggle = {handleDropdownToggle}
                style={{color:'#007BFF'}}
              >
                <Link to='/crear-articulo' className='dropdown-item' onClick={handleDropdownClose}>Crear Artículo</Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ):(
              <Row>
                <Col>
                <FormControl type='text' placeholder='Usuario' value={username} className='mr-2' onChange={(e)=> setUsername(e.target.value)} />
                </Col>
                <Col>
                <FormControl type='password' placeholder='Contraseña' value={password} className='mr-2' onChange={(e)=> setPassword(e.target.value)}/>
                </Col>
                <Col>
                <Button variant='outline-info' className='mr-1' onClick={handleLogin}>Login</Button>
                </Col>
              </Row>
            )}
          </Form>
          <Nav className='mr-auto'>
            <Link to='/user-register' >Registrarse</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

