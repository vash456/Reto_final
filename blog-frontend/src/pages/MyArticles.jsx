import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Article from "../components/Article";
import { useAuth } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap'

const MyArticles = () => {

    const { userId, userToken, userName } = useAuth();

    const [articles, setArticles] = useState([]);

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
    }, []);

    return (
        <div className="text-center">
            <h1 className="text-warning mt-3">Lista de Artículos</h1>
            <div className="card-group mt-3">
                {articles.map((article) => (
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
                            <Button variant="info">Editar</Button>{' '}
                            <Button variant="danger">Eliminar</Button>{' '}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyArticles;
