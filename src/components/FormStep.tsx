import React from 'react';
import { useFormStore } from '../store/formStore';
import { ConditionOptions, FormStep } from '../types';

interface FormStepProps {
  moveToNextStep: () => void;
}

const FormStepComponent: React.FC<FormStepProps> = ({ moveToNextStep }) => {
  const { currentStep, productInfo, setProductInfo } = useFormStore();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductInfo({ [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    moveToNextStep();
  };

  const renderStepForm = () => {
    switch (currentStep) {
      case 'productName':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              商品名 <span className="text-mercari-red">*</span>
            </label>
            <input
              type="text"
              name="productName"
              value={productInfo.productName}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="例: Apple iPhone 14 Pro 256GB グラファイト"
              required
            />
            <p className="text-sm text-mercari-darkGray mt-2">商品名を具体的に入力してください</p>
          </div>
        );
        
      case 'category':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              カテゴリ <span className="text-mercari-red">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={productInfo.category}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="例: スマートフォン/携帯電話 > スマートフォン本体 > iPhone"
              required
            />
            <p className="text-sm text-mercari-darkGray mt-2">メルカリのカテゴリ階層に合わせて入力してください</p>
          </div>
        );
        
      case 'brand':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              ブランド名
            </label>
            <input
              type="text"
              name="brand"
              value={productInfo.brand}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="例: Apple"
            />
            <p className="text-sm text-mercari-darkGray mt-2">ブランド名があれば入力してください</p>
          </div>
        );
        
      case 'condition':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              商品の状態
            </label>
            <select
              name="condition"
              value={productInfo.condition}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
            >
              <option value="">選択してください</option>
              {ConditionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <p className="text-sm text-mercari-darkGray mt-2">商品の状態を選択してください</p>
          </div>
        );
        
      case 'purchaseDate':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              購入時期
            </label>
            <input
              type="text"
              name="purchaseDate"
              value={productInfo.purchaseDate}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="例: 2023年4月"
            />
            <p className="text-sm text-mercari-darkGray mt-2">いつ頃購入したかを入力してください</p>
          </div>
        );
        
      case 'usageFrequency':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              使用回数/期間
            </label>
            <input
              type="text"
              name="usageFrequency"
              value={productInfo.usageFrequency}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="例: 半年間、週に2-3回程度使用"
            />
            <p className="text-sm text-mercari-darkGray mt-2">どのくらい使用したかを入力してください</p>
          </div>
        );
        
      case 'size':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              サイズ/寸法
            </label>
            <input
              type="text"
              name="size"
              value={productInfo.size}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="例: 横15cm × 縦7cm × 厚さ0.8cm"
            />
            <p className="text-sm text-mercari-darkGray mt-2">商品のサイズや寸法を入力してください</p>
          </div>
        );
        
      case 'color':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              色
            </label>
            <input
              type="text"
              name="color"
              value={productInfo.color}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="例: グラファイト"
            />
            <p className="text-sm text-mercari-darkGray mt-2">商品の色を入力してください</p>
          </div>
        );
        
      case 'accessories':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              付属品
            </label>
            <input
              type="text"
              name="accessories"
              value={productInfo.accessories}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="例: 箱、充電ケーブル、説明書"
            />
            <p className="text-sm text-mercari-darkGray mt-2">付属品があれば入力してください</p>
          </div>
        );
        
      case 'features':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              商品の特徴
            </label>
            <textarea
              name="features"
              value={productInfo.features}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red h-32"
              placeholder="例: 高性能カメラ搭載、防水機能あり、バッテリー持ちが良い"
            />
            <p className="text-sm text-mercari-darkGray mt-2">商品の魅力や特徴を入力してください</p>
          </div>
        );
        
      case 'damages':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              傷や汚れの状態
            </label>
            <textarea
              name="damages"
              value={productInfo.damages}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red h-32"
              placeholder="例: 画面右上に小さな傷があります。動作には問題ありません。"
            />
            <p className="text-sm text-mercari-darkGray mt-2">傷や汚れがあれば詳しく入力してください</p>
          </div>
        );
        
      case 'packaging':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              梱包方法
            </label>
            <input
              type="text"
              name="packaging"
              value={productInfo.packaging}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="例: プチプチで丁寧に梱包します"
            />
            <p className="text-sm text-mercari-darkGray mt-2">梱包方法を入力してください</p>
          </div>
        );
        
      case 'shippingMethod':
        return (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium mb-2">
              発送方法
            </label>
            <input
              type="text"
              name="shippingMethod"
              value={productInfo.shippingMethod}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="例: らくらくメルカリ便"
            />
            <p className="text-sm text-mercari-darkGray mt-2">発送方法を入力してください</p>
          </div>
        );
        
      default:
        return null;
    }
  };

  // ステップのタイトルを取得
  const getStepTitle = (): string => {
    const titles: Record<FormStep, string> = {
      productName: '商品名',
      category: 'カテゴリ',
      brand: 'ブランド名',
      condition: '商品の状態',
      purchaseDate: '購入時期',
      usageFrequency: '使用回数/期間',
      size: 'サイズ/寸法',
      color: '色',
      accessories: '付属品',
      features: '商品の特徴',
      damages: '傷や汚れの状態',
      packaging: '梱包方法',
      shippingMethod: '発送方法',
    };
    
    return titles[currentStep];
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mb-8 animate-slide-up">
      <h2 className="text-xl font-bold text-mercari-black mb-4">{getStepTitle()}</h2>
      <form onSubmit={handleSubmit}>
        {renderStepForm()}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-mercari-red hover:bg-mercari-darkRed text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {currentStep === 'shippingMethod' ? '説明文を生成する' : '次へ'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStepComponent;