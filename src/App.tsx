import React, { useEffect } from 'react';
import { ProjectProvider, useStore } from './store';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { Inspector } from './components/Inspector';
import { DebugBar } from './components/DebugBar';
import { LogOut } from 'lucide-react';

const KeyboardManager = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Only delete if NOT clicking canvas (meaning selectedWidgetId is present)
        if (state.selectedWidgetId) {
           dispatch({ type: 'DELETE_WIDGET', payload: state.selectedWidgetId });
           dispatch({ type: 'ADD_LOG', payload: `Deleted widget ${state.selectedWidgetId} via keyboard.` });
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        if (state.selectedWidgetId) {
           dispatch({ type: 'DUPLICATE_WIDGET', payload: state.selectedWidgetId });
           dispatch({ type: 'ADD_LOG', payload: `Duplicated widget ${state.selectedWidgetId} via keyboard.` });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedWidgetId, dispatch]);

  return null;
};

const MainLayout = () => {
    const { state, dispatch } = useStore();
    const isPreview = state.previewMode;

    return (
      <>
        <KeyboardManager />
        <div className="w-screen h-screen flex flex-col font-sans overflow-hidden select-none" style={{ backgroundColor: '#0a0a0b', color: '#d1d5db' }}>
          {!isPreview && <TopBar />}
          <div className="flex-1 flex overflow-hidden relative">
            {!isPreview && <Sidebar />}
            <div className="flex-1 flex flex-col relative overflow-hidden" style={{ backgroundColor: '#0a0a0b' }}>
               <Canvas />
               {!isPreview && <DebugBar />}
            </div>
            {!isPreview && <Inspector />}
          </div>
        </div>
        
        {isPreview && (
          <div className="fixed top-4 right-4 z-50">
            <button
               onClick={() => dispatch({ type: 'SET_PREVIEW_MODE', payload: false })}
               className="flex items-center space-x-2 bg-black/60 hover:bg-black text-white px-4 py-2 rounded-full shadow-lg border border-white/10 backdrop-blur-md transition-all text-sm font-bold"
            >
               <LogOut size={16} className="rotate-180" />
               <span>Exit Preview</span>
            </button>
          </div>
        )}
      </>
    );
};

export default function App() {
  return (
    <ProjectProvider>
      <MainLayout />
    </ProjectProvider>
  );
}
