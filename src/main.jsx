import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker with proper error handling
const updateServiceWorker = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateServiceWorker(true)
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
  onRegistered(r) {
    console.log('SW Registered:', r)
  },
  onRegisterError(error) {
    console.error('SW registration error', error)
  }
})

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
