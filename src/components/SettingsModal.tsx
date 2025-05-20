import React, { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettingsStore();
  const [tempSettings, setTempSettings] = useState(settings);
  
  useEffect(() => {
    if (isOpen) {
      setTempSettings(settings);
    }
  }, [isOpen, settings]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTempSettings({
      ...tempSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSave = () => {
    updateSettings(tempSettings);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-mercari-black">設定</h2>
          <button onClick={onClose} className="text-mercari-darkGray hover:text-mercari-black">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-mercari-black font-medium mb-2">
              OpenAI APIキー
            </label>
            <input
              type="password"
              name="apiKey"
              value={tempSettings.apiKey}
              onChange={handleInputChange}
              className="w-full p-3 border border-mercari-mediumGray rounded-lg focus:outline-none focus:ring-2 focus:ring-mercari-red"
              placeholder="sk-..."
            />
            <div className="mt-2 text-sm flex items-start gap-2">
              <Info className="h-4 w-4 flex-shrink-0 text-mercari-darkGray mt-0.5" />
              <p className="text-mercari-darkGray">
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-mercari-red hover:text-mercari-darkRed"
                >
                  OpenAIのサイト
                </a>
                からAPIキーを取得してください。APIキーはブラウザに保存され、サーバーには送信されません。
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoSave"
                name="autoSave"
                checked={tempSettings.autoSave}
                onChange={handleInputChange}
                className="h-4 w-4 text-mercari-red focus:ring-mercari-red border-mercari-mediumGray rounded"
              />
              <label htmlFor="autoSave" className="ml-2 text-mercari-black">
                生成した説明文を自動保存する
              </label>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-mercari-red hover:bg-mercari-darkRed text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;