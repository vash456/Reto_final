import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateArticle from './components/CreateArticle';

import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path='/crear-articulo' element = {<CreateArticle username = 'Nombre de usuario'/>} />
      </Routes>
    </Router>
  );
};

export default App;
