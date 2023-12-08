import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import PropTypes from 'prop-types';

const CreateArticle = ({ userId }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/posts',{
                title: title,
                content: content,
                user_id: userId,
                },{
                    withCredentials: true,
                });
                console.log('respuesta del backend', response.data);
                setTitle('');
                setContent('');
        }catch (error) {
            console.error('error al enviar datos al backend: ', error);
        }
    }

    return (
        <div className='mt-5 mx-auto' style={{background: '#4285f4', padding: '20px', maxWidth: '500px', borderRadius:'10px'}}>
            <Form style={{ maxWidth: '480px' }} onSubmit={handleSubmit}>
                <h3 className="text-center">Crear Artículo</h3>
                <Form.Group controlId="formTitle">
                    <Form.Label className="mt-2">Título</Form.Label>
                    <Form.Control
                        style={{maxWidth: '300px'}}
                        type="text"
                        placeholder="Ingresa el título"
                        value={title}
                        onChange={(e) =>  setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="mt-2">Contenido</Form.Label>
                    <Form.Control 
                        as='textarea'
                        rows={6}
                        placeholder="Ingresa el contenido"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                
                <Button className="mt-2" variant="primary" type="submit">Crear</Button>

            </Form>
        </div>
    )
};

CreateArticle.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default CreateArticle;
