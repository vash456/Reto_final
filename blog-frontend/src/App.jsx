import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateArticle from './components/CreateArticle';
import UserRegister from './components/UserRegister';

import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path='/crear-articulo' element = {<CreateArticle username = 'Nombre de usuario'/>} />
        <Route path='/registrar-usuario' element = {<UserRegister />} />
      </Routes>
    </Router>
  );
};

export default App;
