import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './store/AuthContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from "react-facebook";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
        <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_CLIENT_ID}>
            <GoogleOAuthProvider clientId={
                import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <App />
            </GoogleOAuthProvider>
        </FacebookProvider>
    </AuthProvider>
  </StrictMode>,
)
