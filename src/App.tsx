import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import StepProgress from './components/StepProgress';
import FormStep from './components/FormStep';
import ResultView from './components/ResultView';
import SettingsModal from './components/SettingsModal';
import { useFormStore } from './store/formStore';
import { useSettingsStore } from './store/settingsStore';
import { generateDescription } from './utils/api';
import { FORM_STEPS } from './types';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { currentStep, setCurrentStep, productInfo, setGeneratedText, setIsGenerating, generatedText } = useFormStore();
  const { settings, updateSettings } = useSettingsStore();
  
  // API キーが設定されていない場合に通知
  useEffect(() => {
    if (!settings.apiKey) {
      setTimeout(() => {
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-slide-up' : 'animate-fade-in'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-mercari-black">
                    APIキーが設定されていません
                  </p>
                  <p className="mt-1 text-sm text-mercari-darkGray">
                    説明文を生成するにはOpenAI APIキーを設定してください
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-mercari-lightGray">
              <button
                onClick={() => {
                  setIsSettingsOpen(true);
                  toast.dismiss(t.id);
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-mercari-red hover:text-mercari-darkRed focus:outline-none"
              >
                設定する
              </button>
            </div>
          </div>
        ), { duration: 5000 });
      }, 1000);
    }
  }, [settings.apiKey]);
  
  const moveToNextStep = async () => {
    const currentIndex = FORM_STEPS.indexOf(currentStep);
    
    // 現在のステップが最後の場合、生成処理を開始
    if (currentIndex === FORM_STEPS.length - 1) {
      // 必須項目のバリデーション
      if (!productInfo.productName || !productInfo.category) {
        toast.error('商品名とカテゴリは必須項目です');
        setCurrentStep('productName');
        return;
      }
      
      // APIキーが設定されているか確認
      if (!settings.apiKey) {
        toast.error('APIキーが設定されていません。設定画面からAPIキーを設定してください。');
        setIsSettingsOpen(true);
        return;
      }
      
      // 説明文生成
      setIsGenerating(true);
      try {
        const generatedText = await generateDescription(productInfo, settings.apiKey);
        setGeneratedText(generatedText);
        
        if (settings.autoSave) {
          updateSettings({ lastGenerated: generatedText });
        }
        
        return;
      } catch (error) {
        console.error('生成エラー:', error);
        toast.error(error instanceof Error ? error.message : '説明文の生成に失敗しました');
      } finally {
        setIsGenerating(false);
      }
    }
    
    // 次のステップに進む
    if (currentIndex < FORM_STEPS.length - 1) {
      setCurrentStep(FORM_STEPS[currentIndex + 1]);
    }
  };
  
  return (
    <div className="min-h-screen bg-mercari-lightGray flex flex-col">
      <Toaster position="top-center" />
      <Header openSettings={() => setIsSettingsOpen(true)} />
      
      <main className="flex-1 py-6 px-4">
        <div className="max-w-5xl mx-auto">
          {currentStep === 'productName' && (
            <div className="max-w-2xl mx-auto text-center mb-6 animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-bold text-mercari-black mb-2">
                メルカリの商品説明文を簡単に自動生成
              </h1>
              <p className="text-mercari-darkGray">
                必要な情報を入力するだけで、魅力的な商品説明文が完成します
              </p>
            </div>
          )}
          
          {generatedText ? (
            <ResultView />
          ) : (
            <>
              <StepProgress />
              <FormStep moveToNextStep={moveToNextStep} />
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-white py-4 shadow-inner mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-mercari-darkGray">
         
        </div>
      </footer>
      
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;