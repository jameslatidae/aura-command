import React from 'react';
import { useStore } from '../store';
import { THEMES } from '../constants/themes';
import { createDefaultButton } from '../constants/defaultProject';
import { Plus, Palette, LayoutTemplate } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { state, dispatch, activeTheme } = useStore();

  const handleAddButton = () => {
    // Add to center mostly
    const btn = createDefaultButton(state.project.page.width / 2 - 80, state.project.page.height / 2 - 30);
    dispatch({ type: 'ADD_WIDGET', payload: btn });
    dispatch({ type: 'ADD_LOG', payload: 'Added new smart button.' });
  };

  return (
    <div 
      className="w-56 border-r flex flex-col shrink-0"
      style={{ backgroundColor: activeTheme.panelBg, borderColor: activeTheme.border, color: activeTheme.textPrimary }}
    >
      
      <div className="p-4 border-b" style={{ borderColor: activeTheme.border }}>
         <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: activeTheme.textSecondary }}>
            Widget Palette
         </div>
         <button 
           onClick={handleAddButton}
           className="w-full flex items-center space-x-3 text-white p-3 border-none rounded-lg shadow-md transition-all group hover:opacity-90"
           style={{ backgroundColor: activeTheme.primary }}
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

      <div className="px-4 py-2 border-t mt-auto" style={{ borderColor: activeTheme.border }}>
         <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: activeTheme.textSecondary }}>
            Global Theme
         </div>
         <div className="space-y-1 overflow-y-auto max-h-[300px] pr-2 custom-scroll">
            {THEMES.map(t => (
               <div
                 key={t.id}
                 onClick={() => dispatch({ type: 'SET_THEME', payload: t.id })}
                 className="flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors"
                 style={{ 
                   backgroundColor: state.project.themeId === t.id ? activeTheme.border : 'transparent',
                   border: state.project.themeId === t.id ? `1px solid ${activeTheme.primary}` : '1px solid transparent'
                 }}
               >
                 <div className="w-3 h-3 rounded-full" style={{ background: t.primary }} />
                 <span className={`text-xs ${state.project.themeId === t.id ? '' : 'opacity-70'}`}>{t.name}</span>
               </div>
            ))}
         </div>
      </div>
      
    </div>
  );
};
