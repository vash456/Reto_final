import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import blogLogo from '../assets/logo.svg';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName, login, logout } = useAuth();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login',{
        username: userData.username,
        password: userData.password,
      });
      if(response.data.success){
        console.log('inicio de sesión exitoso');
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const usernameFromToken = decodedToken.username;
        const userIdFromToken = decodedToken.id;
        login(usernameFromToken, userIdFromToken, token);
        setUserData({
          username: '',
          password: '',
        })
      }else{
        console.log('Datos incorrectos');
      }
    } catch (error) {
      console.error('Error al enviar solicitud de inicio de sección', error);
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);   
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  return (
    <Navbar className='bg-dark expand-lg sticky-top'>
      <Container>
        <Navbar.Brand>
          <Link to='/' style={{color:'#ffc107'}}>
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className='mr-auto'>
            <Link to='/' style={{marginRight: '40px', color:'#ffc107'}}>Artículos</Link>
          </Nav>
          <Form inline="true">
            {isLoggedIn ? (
              <NavDropdown
                title={userName} 
                id='basic-nav-dropdown' 
                show = {dropdownOpen}
                onToggle = {handleDropdownToggle}
                style={{color:'#ffc107'}}
              >
                <Link to='/crear-articulo' className='dropdown-item' onClick={handleDropdownClose}>Crear Artículo</Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ):(
              <Row>
                <Col>
                <FormControl type='text' name='username' placeholder='Usuario' value={userData.username} autoComplete="username" className='mr-1' onChange={handleChange} />
                </Col>
                <Col>
                <FormControl type='password' name='password' placeholder='Contraseña' value={userData.password} className='mr-1' onChange={handleChange}/>
                </Col>
                <Col>
                <Button variant='outline-info' className='mr-1' onClick={handleLogin}>Login</Button>
                </Col>
                <Col>
                  <Nav className='mr-auto'>
                    <Link to='/registrar-usuario' style={{color:'#ffc107'}} >Registrarse</Link>
                  </Nav>
                </Col>
              </Row>

            )}
          </Form>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;