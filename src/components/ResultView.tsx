import React, { useState } from 'react';
import { Clipboard, RefreshCw, ChevronLeft } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { generateDescription } from '../utils/api';

const ResultView: React.FC = () => {
  const { productInfo, generatedText, setGeneratedText, setCurrentStep, isGenerating, setIsGenerating } = useFormStore();
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleRegenerateText = async () => {
    setIsGenerating(true);
    try {
      const text = await generateDescription(productInfo);
      setGeneratedText(text);
    } catch (error) {
      console.error('生成エラー:', error);
      alert(error instanceof Error ? error.message : '説明文の生成に失敗しました');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleBackToForm = () => {
    setCurrentStep('productName');
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-mercari-black">生成された説明文</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg border ${
              copied 
                ? 'bg-success-light border-success text-success' 
                : 'border-mercari-mediumGray text-mercari-darkGray hover:border-mercari-black hover:text-mercari-black'
            } transition-colors`}
          >
            <Clipboard className="h-4 w-4" />
            {copied ? 'コピーしました！' : 'コピー'}
          </button>
          <button
            onClick={handleRegenerateText}
            disabled={isGenerating}
            className="flex items-center gap-1 px-3 py-1 rounded-lg border border-mercari-mediumGray text-mercari-darkGray hover:border-mercari-black hover:text-mercari-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
            再生成
          </button>
        </div>
      </div>
      
      <div className="border rounded-lg p-4 bg-mercari-lightGray min-h-[200px] mb-4 whitespace-pre-wrap">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-mercari-darkGray">
            <RefreshCw className="h-8 w-8 animate-spin mb-2" />
            <p>説明文を生成中...</p>
          </div>
        ) : (
          generatedText || '説明文がまだ生成されていません。'
        )}
      </div>
      
      <div className="mt-4">
        <button
          onClick={handleBackToForm}
          className="flex items-center gap-1 text-mercari-red hover:text-mercari-darkRed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          商品情報の入力に戻る
        </button>
      </div>
    </div>
  );
};

export default ResultView;