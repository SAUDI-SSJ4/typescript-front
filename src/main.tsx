import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
<<<<<<< HEAD
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
=======
>>>>>>> sketch
import "./styles/index.css";
import { LanguageProvider } from "./contexts/LanguageContext";

// Check if Google OAuth is configured
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  console.warn('Google OAuth client ID not found. Google OAuth features will be disabled.');
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
<<<<<<< HEAD
    <HelmetProvider>
      {googleClientId ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          <App />
        </GoogleOAuthProvider>
      ) : (
        <App />
      )}
    </HelmetProvider>
=======
    <LanguageProvider>
      <App />
    </LanguageProvider>
>>>>>>> sketch
  </StrictMode>
);
