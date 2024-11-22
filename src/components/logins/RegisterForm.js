import React from 'react';
import '../../styles/Login.css';

const RegisterForm = ({ switchToLogin }) => (
  <form className="login-form">
    <div className="form-group">
      <input type="text" placeholder="Nom d'utilisateur" required />
    </div>
    <div className="form-group">
      <input type="email" placeholder="Email" required />
    </div>
    <div className="form-group">
      <input type="password" placeholder="Mot de passe" required />
    </div>
    <button type="submit" className="submit-button">S'inscrire</button>
    <p className="switch-auth">
      Vous avez déjà un compte ? <span onClick={switchToLogin}>Connectez-vous</span>
    </p>
  </form>
);

export default RegisterForm;
