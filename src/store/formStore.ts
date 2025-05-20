import { create } from 'zustand';
import { FormState, ProductInfo } from '../types';

const initialProductInfo: ProductInfo = {
  productName: '',
  category: '',
  brand: undefined,
  condition: undefined,
  purchaseDate: undefined,
  usageFrequency: undefined,
  size: undefined,
  color: undefined,
  accessories: undefined,
  features: undefined,
  damages: undefined,
  packaging: undefined,
  shippingMethod: undefined,
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