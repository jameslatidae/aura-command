import React from 'react';
import { useStore } from '../store';
import { createDefaultButton } from '../constants/defaultProject';
import { Plus } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useStore();

  const handleAddButton = () => {
    // Add to center mostly
    const btn = createDefaultButton(state.project.page.width / 2 - 80, state.project.page.height / 2 - 30);
    dispatch({ type: 'ADD_WIDGET', payload: btn });
    dispatch({ type: 'ADD_LOG', payload: 'Added new smart button.' });
  };

  return (
    <div className="w-56 flex flex-col shrink-0 bg-[#16161a] border-r border-[#2d2d35] text-[#d1d5db]">
      
      <div className="p-4">
         <div className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#6b7280]">
            Widget Palette
         </div>
         <button 
           onClick={handleAddButton}
           className="w-full flex items-center space-x-3 text-white p-3 border-none rounded-lg shadow-md transition-all group hover:bg-[#4338ca] bg-[#4f46e5]"
         >
           <div className="bg-white/10 p-1.5 rounded">
              <Plus size={16} />
           </div>
           <div className="text-left">
             <div className="text-xs font-bold">Smart Button</div>
             <div className="text-[9px] opacity-70">Add to Canvas</div>
           </div>
         </button>
      </div>
      
    </div>
  );
};
