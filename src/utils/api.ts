import OpenAI from 'openai';
import { ProductInfo } from '../types';

// 環境変数からAPIキーを取得する
const getApiKey = (apiKey?: string): string => {
  const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  return apiKey || envApiKey || '';
};

export async function generateDescription(productInfo: ProductInfo, apiKey?: string): Promise<string> {
  const effectiveApiKey = getApiKey(apiKey);
  
  if (!effectiveApiKey) {
    throw new Error('APIキーが設定されていません。環境変数 VITE_OPENAI_API_KEY を設定してください。');
  }

  const openai = new OpenAI({
    apiKey: effectiveApiKey,
    dangerouslyAllowBrowser: true,
  });

  // 商品情報から説明文のプロンプトを作成
  const prompt = createPrompt(productInfo);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `あなたはメルカリで商品を出品する際の説明文を作成する専門家です。
与えられた商品情報を元に、魅力的で詳細な商品説明文を作成してください。
以下のガイドラインに従ってください：
- 自然な日本語で書くこと
- 商品の魅力や特徴を強調すること
- 箇条書きとパラグラフを適切に組み合わせること
- 読みやすく整理された形式にすること
- メルカリのユーザーが欲しいと思うような表現にすること
- 絵文字は適度に使用すること`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const generatedText = response.choices[0]?.message?.content;
    if (!generatedText) {
      throw new Error('説明文の生成に失敗しました。APIからの応答が空です。');
    }
    
    return generatedText;
  } catch (error) {
    if (error instanceof Error) {
      console.error('OpenAI APIエラー:', error.message);
      
      // APIキーエラーの場合は専用のメッセージを返す
      if (error.message.includes('API key')) {
        throw new Error('APIキーが無効です。正しいAPIキーを設定してください。');
      }
      
      throw error;
    }
    
    // 未知のエラーの場合
    console.error('OpenAI API未知のエラー:', error);
    throw new Error('説明文の生成中に予期せぬエラーが発生しました。');
  }
}

function createPrompt(productInfo: ProductInfo): string {
  let prompt = `以下の商品情報を元に、メルカリの出品用の説明文を作成してください：\n\n`;
  
  // 必須項目
  prompt += `【商品名】${productInfo.productName}\n`;
  prompt += `【カテゴリ】${productInfo.category}\n`;
  
  // オプション項目（値がある場合のみ追加）
  if (productInfo.brand) prompt += `【ブランド】${productInfo.brand}\n`;
  if (productInfo.condition) prompt += `【商品の状態】${productInfo.condition}\n`;
  if (productInfo.purchaseDate) prompt += `【購入時期】${productInfo.purchaseDate}\n`;
  if (productInfo.usageFrequency) prompt += `【使用回数/期間】${productInfo.usageFrequency}\n`;
  if (productInfo.size) prompt += `【サイズ/寸法】${productInfo.size}\n`;
  if (productInfo.color) prompt += `【色】${productInfo.color}\n`;
  if (productInfo.accessories) prompt += `【付属品】${productInfo.accessories}\n`;
  if (productInfo.features) prompt += `【商品の特徴】${productInfo.features}\n`;
  if (productInfo.damages) prompt += `【傷や汚れの状態】${productInfo.damages}\n`;
  if (productInfo.packaging) prompt += `【梱包方法】${productInfo.packaging}\n`;
  if (productInfo.shippingMethod) prompt += `【発送方法】${productInfo.shippingMethod}\n`;
  
  prompt += `\n以下の点を説明文に含めてください：
- 商品の魅力や特徴
- 状態や使用感
- サイズや色などの詳細情報
- 付属品の有無
- 梱包・発送に関する情報（該当する場合）

読みやすく、魅力的な説明文にしてください。`;

  return prompt;
}