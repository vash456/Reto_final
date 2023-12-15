import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Article from "../components/Article";
import HomePagination from "../components/Pagination";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const articlesPerPage = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts/all");
        setArticles(response.data);

        const userIds = [...new Set(response.data.map((article) => article.user_id))];
        fetchUsernames(userIds);

      } catch (error) {
        console.error("Error al obtener datos del backend: ", error);
      }
    };

    fetchArticles();
    
  }, []);

  const fetchUsernames = async (userIds) => {
    const newUsernameState = { ...usernames };
    for(const userId of userIds) {
      try{
        const userResponse= await axios.get(`http://localhost:3000/users/username/${userId}`);
        newUsernameState[userId] = userResponse.data.username;
      }catch(error){
        console.error("Error al obtener el username", error);
        newUsernameState[userId] = 'Usuario desconocido';
      }
    }
    setUsernames(newUsernameState);
  };

  useEffect(() => {
    // Filtrar los artículos con estado 1
    const filtered = articles.reverse().filter((article) => article.status === 1);
    setFilteredArticles(filtered);
  }, [articles]);

  // Paginación

   const indexLastArticle = currentPage * articlesPerPage;
   const indexFirstArticle = indexLastArticle - articlesPerPage;
   const currentArticles = filteredArticles.slice(indexFirstArticle,indexLastArticle);

   const paginate = (pagNumber) => setCurrentPage(pagNumber);

  return (
    <div className="text-center">
      <h1 className="text-warning mt-3">Lista de Artículos</h1>
      <div className="card-group mt-3">
        {currentArticles
        .filter((article) => article.status === 1)
        .map((article) => (
          <Link to={`/article/${article.id}`} key={article.id} className="m-3">
            <Article
              key={article.id}
              numberId={article.id}
              title={article.title}
              brief={article.brief}
              content={article.content}
              image={article.image}
              createdAt={article.created_at}
              username={usernames[article.user_id] || 'usuario desconocido'}
            />
          </Link>
          ))
        }
      </div>
      <HomePagination paginate={paginate} totalArticles={filteredArticles.length} articlesPerPage={articlesPerPage} />
    </div>
  );
};

export default Home;
