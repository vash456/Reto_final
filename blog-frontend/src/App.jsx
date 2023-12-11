import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateArticle from './components/CreateArticle';
import UserRegister from './components/UserRegister';
import ArticleDetails from './pages/ArticleDetails';

import './App.css';

const App = () => {
  return (
    <div className='bg-dark bg-gradient text-white m-0'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path='/crear-articulo' element = {<CreateArticle />} />
          <Route path='/article/:id' element = {<ArticleDetails />} />
          <Route path='/registrar-usuario' element = {<UserRegister />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
