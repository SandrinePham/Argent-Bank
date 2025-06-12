import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../app/slices/authSlice';

function LoginForm() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);
  const error = useSelector(state => state.auth.error);
  const token = useSelector(state => state.auth.token);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div>
      {token ? (
        <div>
          <p>Connecté ✅</p>
          <button onClick={() => dispatch(logout())}>Déconnexion</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Connexion...' : 'Se connecter'}
          </button>
          {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default LoginForm;
