import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// PWAの更新確認
function PWAUpdateHandler() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  
  useEffect(() => {
    const checkForUpdates = async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        
        if (registration) {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        }
      }
    };
    
    checkForUpdates().catch(console.error);
  }, []);
  
  const refreshApp = () => {
    window.location.reload();
  };
  
  if (!updateAvailable) return null;
  
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-max bg-mercari-black text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
      <div className="flex items-center gap-2">
        <p>新しいバージョンが利用可能です</p>
        <button 
          onClick={refreshApp}
          className="px-3 py-1 bg-mercari-red text-white rounded-md text-sm hover:bg-mercari-darkRed transition"
        >
          更新する
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <PWAUpdateHandler />
  </StrictMode>
);