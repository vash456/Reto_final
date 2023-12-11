import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

const ArticleDetails = () => {

  const { isLoggedIn, userToken, userName } = useAuth();
  const { id } = useParams();
  
  const [articleDetails, setArticleDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [comments, setComments] = useState([])
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const articleResponse = await axios.get(`http://localhost:3000/posts/${id}`);
        setArticleDetails(articleResponse.data);

        const userResponse = await axios.get(`http://localhost:3000/users/username/${articleResponse.data.user_id}`);
        setUserDetails(userResponse.data);

        const commentsResponse = await axios.get(`http://localhost:3000/comments/post/${id}`);
        setComments(commentsResponse.data);
        
      } catch (error) {
        console.error("Error al obtener detalles del artículo", error);
      }

    };
    fetchArticleDetails();

  },[id]);

  
  

  const handleCommentSubmit = async () => {
    try {
      // Verifica si el comentario no está vacío
      if (newComment.trim() === '') {
        return;
      }
      const commentsResponse = await axios.post(`http://localhost:3000/comments/`, {
        name: userName,
        comment: newComment,
        post_id: id,
        status: 1,
      }, {
          withCredentials: true,
          headers: {
            Authorization: userToken
          }
      });
      setComments(commentsResponse.data);
      // Limpia el campo de comentario después de enviarlo
      setNewComment('');
    } catch (error) {
      console.error("Error al agregar comentario", error);
    }
  };

  return (
    <div>
      <h1>Titulo: {articleDetails.title}</h1>
      <br />
      <h3>Brief: {articleDetails.brief}</h3>
      <br />
      <p>Contenido: {articleDetails.content}</p>
      <br />
      <p>Creado por: {userDetails.username}</p>
      <br />
      <p>Fecha de creación: {articleDetails.created_at}</p>
      <h2>Comentarios:</h2>
      {isLoggedIn && (
        <>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Comentar
          </Button>
          <Collapse in={open}>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Comentario:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </Form.Group>
              <Button onClick={handleCommentSubmit}>Comentar</Button>
            </Form>
          </Collapse>
        </>
      )}
      
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>Usuario: {comment.name}</p>
            <p>Comentario: {comment.comment}</p>
            <p>Email: {comment.email}</p>
            <p>fecha: {comment.created_at}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleDetails;