import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState('');

  const login = (username, user_id, token) => {
    setIsLoggedIn(true);
    setUserName(username);
    setUserId(user_id);
    setUserToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserId(null);
    setUserToken('');
  };

  const value = {
    isLoggedIn,
    userName,
    userId,
    userToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};