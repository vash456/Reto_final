import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Article from "../components/Article";
import { useAuth } from '../contexts/AuthContext'
import { Button, Toast } from 'react-bootstrap'

const MyArticles = () => {

    const { userId, userToken, userName } = useAuth();
    const [articles, setArticles] = useState([]);
    
    //Manejo el mensaje de éxito al eliminar y además lo uso como dependencia para el useEffect
    //Para re-renderizar luego de la eliminación
    const [toastDelete, setToastDelete] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/posts/post/${userId}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: userToken
                    }

                });

                setArticles(response.data);

            } catch (error) {
                console.error("Error al obtener datos del backend: ", error);
            }
        };

        fetchArticles();
        
    },[userToken, userId, toastDelete]);


    const handleDelete = async (articleId) => {
        try {
            await axios.patch(`http://localhost:3000/posts/${userId}/${articleId}`,{
                title: 'Artículo eliminado',
                user_id: userId,
                status:0
            },
            {
                withCredentials: true,
                headers: {
                    Authorization: userToken
                }
            }) 

            setToastDelete(true);
        } catch (error) {
            console.error('Error al eliminar el artículo', error);
        }

    }

    return (
        <div className="text-center">
            <h1 className="text-warning mt-3">Artículos de: {userName}</h1>
            <div className="card-group mt-3">
                {articles.map((article) => (
                    article.status === 1 && (
                    <div key={article.id} className=" m-3">
                        <Link to={`/article/${article.id}`}>
                            <Article
                                key={article.id}
                                numberId={article.id}
                                title={article.title}
                                brief={article.brief}
                                content={article.content}
                                image={article.image}
                                username={userName}
                                createdAt={article.created_at}
                            />
                        </Link>
                        <Button variant="info">Editar</Button>{' '}
                        <Button onClick={() => handleDelete(article.id)} variant="danger">Eliminar</Button>{' '}
                    </div>
                    )
                ))}
            </div>
            <Toast
                show={toastDelete}
                onClose={() => setToastDelete(false)}
                delay={3000}
                autohide
                style={{
                    position: 'fixed',
                    top: 60,
                    right: '10%',
                }}
            >
                <Toast.Header><strong className="mr-auto">Éxito!</strong></Toast.Header>
                <Toast.Body>Se eliminó el artículo exitósamente</Toast.Body>
            </Toast>
        </div>
    );
};

export default MyArticles;
