import React from 'react';
import Container from 'react-bootstrap/Container'

import '../../styles/main-site/main.css'
import logo from '../../assets/img/logo.png';
import LoginForm from '../../components/main-site/LoginForm';

const Login = () => (
  <Container>
    <LoginForm />
  </Container>
);

export default Login;

