import { useState } from 'react';
import { Button, Form, Toast } from "react-bootstrap";
import axios from 'axios';

const UserRegister = () => {

    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [ e.target.name ]: '',
        })
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if(!userData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
            isValid = false;
        }

        if(!userData.username.trim()) {
            newErrors.username = 'El username es obligatorio';
            isValid = false;
        }

        if(!userData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
            isValid = false;
        }

        if(!userData.password.trim()) {
            newErrors.password = 'La contraseña es obligatoria';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!validateForm()){
            return;
        }

        try{
            const response = await axios.post('http://localhost:3000/users', {
                name:userData.name,
                lastname: userData.lastname,
                username: userData.username,
                email: userData.email,
                password: userData.password,
                status: 1,
                kind: 1,
            }, {
                withCredentials: true,
            });
            // Mostrar mensaje de exito al enviar los datos
            setShowToast(true);

            // vaciar los campos del form
            setUserData({
                name: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
            })

            console.log('Respuesta del backend', response.data);

        }catch(error){
            console.error('Error al enviar los datos al backend', error);
        }

    };

    return (
        <div className='mt-5 mx-auto' style={{background: '#4285f4', padding: '20px', maxWidth: '500px', borderRadius:'10px'}}>
            <Form style={{ maxWidth: '480px' }} onSubmit={handleSubmit}>
                <h3 className="text-center">Regístrate</h3>
                <Form.Group controlId="formName" className='mt-3'>
                    <Form.Control
                        type='text'
                        name='name'
                        placeholder="Nombre"
                        value={userData.name}
                        onChange={handleChange}
                    />
                <Form.Text className="text-danger">{errors.name}</Form.Text>
                </Form.Group>

                <Form.Group controlId='formLastname' className='mt-3'>
                    <Form.Control 
                        type='text'
                        name='lastname'
                        placeholder="Apellidos"
                        value={userData.lastname}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formUsername" className='mt-3'>
                    <Form.Control
                        type='text'
                        name='username'
                        placeholder="Nombre de usuario"
                        value={userData.username}
                        onChange={handleChange}
                    />
                <Form.Text className="text-danger">{errors.username}</Form.Text>
                </Form.Group>

                <Form.Group controlId='formEmail' className='mt-3'>
                    <Form.Control
                        type='email'
                        name='email'
                        placeholder='Correo Electrónico'
                        value={userData.email}
                        onChange={handleChange}
                    />
                <Form.Text className="text-danger">{errors.email}</Form.Text>
                </Form.Group>

                <Form.Group controlId='formPassword' className='mt-3'>
                    <Form.Control 
                        type='password'
                        name='password'
                        placeholder='Contraseña'
                        value={userData.password}
                        onChange={handleChange}
                    />
                <Form.Text className="text-danger">{errors.password}</Form.Text>
                </Form.Group>
                
                <Button className="mt-2" variant="primary" type="submit">Registrar</Button>

            </Form>
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                delay={3000}
                autohide
                style={{
                    position: 'fixed',
                    top: 60,
                    right: '10%',
                }}
            >
                <Toast.Header>
                    <strong className="mr-auto">Éxito!</strong>
                </Toast.Header>
                <Toast.Body>Se creó el artículo exitosamente</Toast.Body>
            </Toast>
        </div>
    );
};

export default UserRegister;
