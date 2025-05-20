import { create } from 'zustand';
import { FormState, ProductInfo } from '../types';

const initialProductInfo: ProductInfo = {
  productName: '',
  category: '',
  brand: '',
  condition: '',
  purchaseDate: '',
  usageFrequency: '',
  size: '',
  color: '',
  accessories: '',
  features: '',
  damages: '',
  packaging: '',
  shippingMethod: '',
};

export const useFormStore = create<FormState>((set) => ({
  currentStep: 'productName',
  productInfo: initialProductInfo,
  generatedText: '',
  isGenerating: false,
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setProductInfo: (info) => set((state) => ({
    productInfo: { ...state.productInfo, ...info }
  })),
  
  setGeneratedText: (text) => set({ generatedText: text }),
  
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  resetForm: () => set({
    productInfo: initialProductInfo,
    generatedText: '',
    currentStep: 'productName'
  }),
}));