import React from 'react';
import { Footer, Login as LoginComp } from '../components';

function Login() {
  return (
    <div>
    <div className="min-h-screen flex items-center justify-center">
      <LoginComp />
    </div>
    <Footer/>
    </div>
  );
}

export default Login;
