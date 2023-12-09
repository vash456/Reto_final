import { useState, useEffect } from "react";
import axios from "axios";
import Article from "../components/Article";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts/all");
        setArticles(response.data);
      } catch (error) {
        console.error("Error al obtener datos del backend: ", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="text-center">
      <h1>Lista de Artículos</h1>
      <div className="card-group mt-3">
        {articles.map((article) => (
          <div key={article.id} className="m-3">
            <Article
              key={article.id}
              title={article.title}
              brief={article.brief}
              content={article.content}
              image={article.image}
              username='juan carlos'
            />
            </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
