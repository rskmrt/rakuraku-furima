import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// PWAの更新確認コンポーネント
function PWAUpdateHandler() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  
  useEffect(() => {
    // PWAの更新を確認する関数
    const checkForUpdates = async () => {
      if ('serviceWorker' in navigator) {
        try {
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

            // 既存のサービスワーカーがある場合は更新をチェック
            registration.update().catch(console.error);
          }
        } catch (error) {
          console.error('Service worker registration failed:', error);
        }
      }
    };
    
    // コンポーネントマウント時に更新をチェック
    checkForUpdates();

    // 定期的に更新をチェック（1時間ごと）
    const intervalId = setInterval(checkForUpdates, 60 * 60 * 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  // アプリを更新する関数
  const refreshApp = () => {
    window.location.reload();
  };
  
  if (!updateAvailable) return null;
  
  // 更新通知UI
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

// 404ページからのリダイレクト処理
const redirectFromNotFoundPage = () => {
  if (typeof window.sessionStorage !== 'undefined') {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    
    if (redirect && redirect !== window.location.href) {
      window.history.replaceState(null, '', redirect);
    }
  }
};

// リダイレクト処理を実行
redirectFromNotFoundPage();

// rootノードにReactをマウント
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
      <PWAUpdateHandler />
    </StrictMode>
  );
}