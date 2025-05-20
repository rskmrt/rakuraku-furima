import React, { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import StepProgress from './components/StepProgress';
import FormStep from './components/FormStep';
import ResultView from './components/ResultView';
import { useFormStore } from './store/formStore';
import { generateDescription } from './utils/api';
import { FORM_STEPS } from './types';

// 環境変数からAPIキーが設定されているか確認
const isApiKeySetInEnv = (): boolean => {
  return !!import.meta.env.VITE_OPENAI_API_KEY;
};

function App() {
  const { currentStep, setCurrentStep, productInfo, setGeneratedText, setIsGenerating, generatedText } = useFormStore();
  const apiKeyFromEnv = isApiKeySetInEnv();
  
  // 環境変数にAPIキーが設定されているか確認
  useEffect(() => {
    if (!apiKeyFromEnv) {
      setTimeout(() => {
        toast.error('環境変数にAPIキーが設定されていません。詳細はREADMEを参照してください。', {
          duration: 5000,
        });
      }, 1000);
    }
  }, [apiKeyFromEnv]);
  
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
      if (!apiKeyFromEnv) {
        toast.error('環境変数にAPIキーが設定されていません。詳細はREADMEを参照してください。');
        return;
      }
      
      // 説明文生成
      setIsGenerating(true);
      try {
        const generatedText = await generateDescription(productInfo);
        setGeneratedText(generatedText);
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
      <Header />
      
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
    </div>
  );
}

export default App;