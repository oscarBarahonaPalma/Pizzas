import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'

// Client ID de Google (temporalmente hardcodeado)
const GOOGLE_CLIENT_ID = '485581698926-g6iebchffr8j0bk99ruptjcmar72svmn.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LoadingScreen>
        <App />
      </LoadingScreen>
    </GoogleOAuthProvider>
  </StrictMode>,
)
