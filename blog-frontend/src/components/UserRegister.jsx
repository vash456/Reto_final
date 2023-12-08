import { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import axios from 'axios';

const UserRegister = () => {

    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        img: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

    };

    return (
        <div className='mt-5 mx-auto' style={{background: '#4285f4', padding: '20px', maxWidth: '500px', borderRadius:'10px'}}>
            <Form style={{ maxWidth: '480px' }} onSubmit={handleSubmit}>
                <h3 className="text-center">Regístrate</h3>
                <Form.Group controlId="formName" className='mt-3'>
                    <Form.Control
                        type='text'
                        placeholder="Nombre"
                        value={userData.name}
                        onChange={(e) =>  setUserData(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='formLastname' className='mt-3'>
                    <Form.Control 
                        type='text'
                        placeholder="Apellidos"
                        value={userData.lastname}
                        onChange={(e) => setUserData(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formUsername" className='mt-3'>
                    <Form.Control
                        type='text'
                        placeholder="Nombre de usuario"
                        value={userData.username}
                        onChange={(e) =>  setUserData(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='formEmail' className='mt-3'>
                    <Form.Control
                        type='email'
                        placeholder='Correo Electrónico'
                        value={userData.email}
                        onChange={(e)=> setUserData(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='formPassword' className='mt-3'>
                    <Form.Control 
                        type='password'
                        placeholder='Contraseña'
                        value={userData.password}
                        onChange={(e) => setUserData(e.target.value)}
                    />
                </Form.Group>
                
                <Button className="mt-2" variant="primary" type="submit">Registrar</Button>

            </Form>
        </div>
    );
};

export default UserRegister;
