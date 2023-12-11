import { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const CreateArticle = () => {

    const { userId, userToken } = useAuth();

    const [articleData, setArticleData] = useState({
        title: '',
        brief: '',
        content: '',
        status: 1,
        user_id: userId,
    });

    const [errors, setErrors] = useState({
        title: '',
        content: '',
    });

    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        setArticleData({
            ...articleData,
            [ e.target.name ]: e.target.value
        });
        setErrors({
            ...errors,
            [ e.target.name ]: '',
        })
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if(!articleData.title.trim()) {
            newErrors.title = 'El título es obligatorio';
            isValid = false;
        }

        if(!articleData.content.trim()) {
            newErrors.content = 'El contenido es obligatorio';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setArticleData({
                ...articleData,
                image: selectedFile,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/posts/create/${userId}`, {
                title: articleData.title,
                brief: articleData.brief,
                content: articleData.content,
                status: 1,
                user_id: userId,
            }, {
                withCredentials: true,
                headers: {
                    Authorization: userToken
                }
            });

            // Mostrar mensaje de exito al enviar los datos
            setShowToast(true);

            // vaciar los campos del form
            setArticleData({
                title: '',
                brief: '',
                content: '',
            })

            console.log('Respuesta del backend', response.data)
        }catch (error) {
            console.error('error al enviar datos al backend: ', error);
        }
    };

    return (
        <div className='mt-3 mx-auto' style={{background: '#4285f4', padding: '20px', maxWidth: '500px', borderRadius:'10px'}}>
            <Form style={{ maxWidth: '480px' }} onSubmit={handleSubmit}>
                <h3 className="text-center">Crear Artículo</h3>
                <Form.Group controlId="formTitle">
                    <Form.Label className="mt-2">Título *</Form.Label>
                    <Form.Control
                        style={{maxWidth: '300px'}}
                        type="text"
                        name="title"
                        placeholder="Ingresa el título"
                        value={articleData.title}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-danger">{errors.title}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBrief">
                    <Form.Label className="mt-2">Brief</Form.Label>
                    <Form.Control 
                        as="textarea"
                        name="brief"
                        rows={2}
                        placeholder="Escribe una breve descripción"
                        value={articleData.brief}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formContent">
                    <Form.Label className="mt-2">Contenido *</Form.Label>
                    <Form.Control 
                        as='textarea'
                        name="content"
                        rows={4}
                        placeholder="Ingresa el contenido"
                        value={articleData.content}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-danger">{errors.content}</Form.Text>
                </Form.Group>

                {/* Campo para seleccionar imagen */} 

                <Form.Group controlId="formImage">
                    <Form.Label className="mt-2">Subir imagen</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </Form.Group>
                
                <Button className="mt-2" variant="primary" type="submit">Crear</Button>

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
export default CreateArticle;
