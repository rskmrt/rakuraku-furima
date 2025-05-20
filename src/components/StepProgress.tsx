import React from 'react';
import { useFormStore } from '../store/formStore';
import { FormStep } from '../types';

const StepProgress: React.FC = () => {
  const { currentStep, setCurrentStep, productInfo } = useFormStore();
  
  const steps: FormStep[] = [
    'productName',
    'category',
    'brand',
    'condition',
    'purchaseDate',
    'usageFrequency',
    'size',
    'color',
    'accessories',
    'features',
    'damages',
    'packaging',
    'shippingMethod',
  ];
  
  const currentIndex = steps.indexOf(currentStep);
  
  const handleStepClick = (step: FormStep) => {
    const stepIndex = steps.indexOf(step);
    const currentIndex = steps.indexOf(currentStep);
    
    // 必須項目がまだ未入力の場合はクリックを許可しない
    if ((productInfo.productName === '' || productInfo.category === '') 
        && (step !== 'productName' && step !== 'category')) {
      return;
    }
    
    // 前のステップには常に戻れるようにする
    if (stepIndex <= currentIndex) {
      setCurrentStep(step);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-6 px-4 overflow-x-auto">
      <div className="flex min-w-max py-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;
          
          // ステップのタイトルを取得
          const getStepTitle = (step: FormStep): string => {
            const titles: Record<FormStep, string> = {
              productName: '商品名',
              category: 'カテゴリ',
              brand: 'ブランド',
              condition: '状態',
              purchaseDate: '購入時期',
              usageFrequency: '使用頻度',
              size: 'サイズ',
              color: '色',
              accessories: '付属品',
              features: '特徴',
              damages: '傷・汚れ',
              packaging: '梱包',
              shippingMethod: '発送',
            };
            
            return titles[step];
          };
          
          return (
            <React.Fragment key={step}>
              <div 
                className={`flex flex-col items-center cursor-pointer transition-colors duration-200 ${
                  isCurrent ? 'text-mercari-red' : 
                  isCompleted ? 'text-mercari-black' : 
                  'text-mercari-mediumGray'
                }`}
                onClick={() => handleStepClick(step)}
              >
                <div 
                  className={`rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium ${
                    isCurrent ? 'bg-mercari-red text-white' : 
                    isCompleted ? 'bg-mercari-black text-white' : 
                    'bg-mercari-lightGray text-mercari-darkGray'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs mt-1 whitespace-nowrap">
                  {getStepTitle(step)}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={`w-10 h-0.5 self-center mx-1 ${
                    index < currentIndex ? 'bg-mercari-black' : 'bg-mercari-lightGray'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;