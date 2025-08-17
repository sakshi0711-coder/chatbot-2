import React, { useState } from 'react';
import nhost from '../nhostClient';
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const result = await nhost.auth.signIn({ email, password });
    setLoading(false);
    if (result.error) {
      alert(result.error.message || 'Sign in failed');
    } else {
      alert('Sign in successful!');
       navigate("/messageinput")
      
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    const result = await nhost.auth.signUp({ email, password });
    setLoading(false);
    if (result.error) {
      alert(result.error.message || 'Sign up failed');
    } else {
      alert('Account created!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Auth</h2>
      
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        style={{ width: '90%', padding: '10px', marginBottom: '20px' }}
      />
      
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </div>
  );
};

export default AuthForm;