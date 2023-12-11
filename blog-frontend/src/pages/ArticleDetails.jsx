import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetails = () => {

  const { id } = useParams();
  
  const [articleDetails, setArticleDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [comments, setComments] = useState([])

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
  }, [ id ]);
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
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>{comment.email}</p>
            <p>fecha: {comment.created_at}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleDetails;