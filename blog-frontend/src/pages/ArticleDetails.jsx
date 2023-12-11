import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import ArticleComments from '../components/ArticleComments';

const ArticleDetails = () => {

  const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    const formatedDate = new Date(dateString).toLocaleDateString(undefined, options);

    return formatedDate;
  }

  const { isLoggedIn, userToken, userName } = useAuth();
  const { id } = useParams();
  
  const [articleDetails, setArticleDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [openTextArea, setOpenTextArea] = useState(false);

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

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      return;
    }

    try {

      await axios.post('http://localhost:3000/comments/', {
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
      setComments([...comments, {
        name: userName,
        comment: newComment,
        email: 'userEmail',
        created_at: "just created"  
      }])
      console.log(comments);
      setNewComment('');
      
    } catch (error) {
      console.error("Error al agregar comentario", error);
    }
  };

  return (
    <div className='text-center'>
      <h1>Titulo: {articleDetails.title}</h1>
      <br />
      <h3>Brief: {articleDetails.brief}</h3>
      <br />
      <p>Contenido: {articleDetails.content}</p>
      <br />
      <p>Creado por: {userDetails.username}</p>
      <br />
      <p>Fecha de creación: {formatDate(articleDetails.created_at)}</p>
      <br />

      <h2 className='mt-5'>Comentarios:</h2>
      <div>
      {isLoggedIn && (
        <div>
          <Button
            onClick={() => setOpenTextArea(!openTextArea)}
            aria-controls="example-collapse-text"
            aria-expanded={openTextArea}
          >
            Agregar un comentario
          </Button>
          <Collapse in={openTextArea}>
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Comentario:</Form.Label>
                <Form.Control
                  style={{ width: '18rem'}}
                  className='mx-auto'
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={handleCommentChange}
                />
              </Form.Group>
              <Button onClick={handleCommentSubmit}>Comentar</Button>
            </Form>
          </Collapse>
        </div>
      )}
        {/* Resnderizado de la lista de comentarios */}
        <ArticleComments comments={comments} />
      </div>
    </div>
  );
}

export default ArticleDetails;