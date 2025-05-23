import React from 'react';
import { Tag } from 'lucide-react';
import { useFormStore } from '../store/formStore';

const Header: React.FC = () => {
  const resetForm = useFormStore((state) => state.resetForm);
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Tag className="h-6 w-6 text-mercari-red" />
          <h1 className="text-xl font-bold text-mercari-black">メルカリ説明文ジェネレーター</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={resetForm}
            className="text-mercari-darkGray hover:text-mercari-black transition px-2 py-1 rounded text-sm"
          >
            新規作成
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;