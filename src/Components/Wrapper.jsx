import React from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';


const AuthNavigator = ({ children }) => {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      {children}
    </AuthProvider>
  );
};

const AppWrapper = ({ children }) => (
  <Router>
    <AuthNavigator>
      {children}
    </AuthNavigator>
  </Router>
);

export { AppWrapper, AuthNavigator };
