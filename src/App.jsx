import React from 'react';
import { NhostProvider, useAuthenticationStatus } from '@nhost/react';
import nhost from './nhostClient';
import AuthForm from './components/AuthForm';
import ChatList from './components/ChatList';
import { Route, Routes } from 'react-router-dom';
import MessageInput from './components/MessageInput';


function AuthGate() {
  const { isAuthenticated, isLoading, error } = useAuthenticationStatus();
  
  console.log('👀 Auth status:', { 
    isAuthenticated, 
    isLoading, 
    error,
    // Additional debugging info
    hasUser: !!nhost.auth.getUser(),
    hasToken: !!nhost.auth.getAccessToken()
  });



  return isAuthenticated ? <MessageInput /> : <AuthForm />;
}



export default function App() {
  return (
    <NhostProvider nhost={nhost}>
      <div className="App">
        <AuthGate />
      </div>
    </NhostProvider>
  );
}
