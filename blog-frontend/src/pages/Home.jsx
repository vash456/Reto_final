import { useState, useEffect } from "react";
import axios from "axios";
import Article from "../components/Article";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [usernames, setUsernames] = useState({});

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
        const userResponse= await axios.get(`http://localhost:3000/users/${userId}`);
        newUsernameState[userId] = userResponse.data.username;
      }catch(error){
        console.error("Error al obtener el username", error);
        newUsernameState[userId] = 'Usuario desconocido';
      }
    }
    setUsernames(newUsernameState);
  };

  return (
    <div className="text-center">
      <h1>Lista de Artículos</h1>
      <div className="card-group mt-3">
        {articles.map((article) => (
          <div key={article.id} className="m-3">
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
            </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
