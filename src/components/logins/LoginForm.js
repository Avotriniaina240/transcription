import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

const LoginForm = ({ switchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Créer une instance de navigate pour la redirection
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        navigate('/guide');
      } else {
        setLoginError(data.message); // Afficher l'erreur du backend
      }
    } catch (error) {
      setLoginError('Erreur de connexion. Veuillez réessayer plus tard.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={handleEmailChange} 
          required 
        />
        {loginError && loginError.includes("adresse email valide") && <p className="error-message">{loginError}</p>}
      </div>
      <div className="form-group password-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="password-toggle-icon"
          onClick={togglePasswordVisibility}
        />
        {loginError && loginError.includes("mot de passe") && <p className="error-message">{loginError}</p>}
      </div>
      {loginError && !loginError.includes("adresse email valide") && !loginError.includes("mot de passe") && <p className="error-message">{loginError}</p>}
      <button type="submit" className="submit-button">Se connecter</button>
      <p className="switch-auth">
        Pas de compte ? <span onClick={switchToRegister}>Inscrivez-vous</span>
      </p>
    </form>
  );
};

export default LoginForm;