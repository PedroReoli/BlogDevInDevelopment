// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/CSS/globals.css';
import '@/CSS/blog.css';
// import '@/CSS/Responsive.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
