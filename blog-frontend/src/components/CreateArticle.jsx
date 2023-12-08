import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CreateArticle = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(title);
        console.log(content);
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
export default CreateArticle;
