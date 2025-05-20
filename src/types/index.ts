export interface ProductInfo {
  productName: string;
  category: string;
  brand?: string;
  condition?: string;
  purchaseDate?: string;
  usageFrequency?: string;
  size?: string;
  color?: string;
  accessories?: string;
  features?: string;
  damages?: string;
  packaging?: string;
  shippingMethod?: string;
}

export type FormStep = keyof ProductInfo;

export const ConditionOptions = [
  '新品、未使用',
  '未使用に近い',
  '目立った傷や汚れなし',
  'やや傷や汚れあり',
  '傷や汚れあり',
  '全体的に状態が悪い'
];

export const FORM_STEPS: FormStep[] = [
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

export interface UserSettings {
  apiKey: string;
  autoSave: boolean;
  lastGenerated: string;
}

export interface FormState {
  currentStep: FormStep;
  productInfo: ProductInfo;
  generatedText: string;
  isGenerating: boolean;
  setCurrentStep: (step: FormStep) => void;
  setProductInfo: (info: Partial<ProductInfo>) => void;
  setGeneratedText: (text: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  resetForm: () => void;
}

export interface SettingsState {
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
}