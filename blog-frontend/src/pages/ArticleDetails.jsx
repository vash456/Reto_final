import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetails = () => {

  const { id } = useParams();

  const [articleDetails, setArticleDetails] = useState(null);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setArticleDetails(response.data);
        
      } catch (error) {
        console.error("Error al obtener detalles del artículo", error);
      }

    };
    fetchArticleDetails();
  }, [ id ]);

  return (
    <div>
      <h1>{articleDetails.title}</h1>
      <br />
      <h3>{articleDetails.brief}</h3>
      <br />
      <p>{articleDetails.content}</p>
      <br />
      <p>{articleDetails.user_id}</p>
      <br />
      <p>{articleDetails.created_at}</p>
    </div>
  );
}

export default ArticleDetails;