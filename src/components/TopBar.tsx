import React, { useRef } from 'react';
import { useStore } from '../store';
import { Play, Save, FolderOpen, Download, Upload, PlusSquare } from 'lucide-react';
import { AURAProject } from '../types';

export const TopBar: React.FC = () => {
  const { state, dispatch, activeTheme } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const json = JSON.stringify(state.project, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.project.project.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    dispatch({ type: 'ADD_LOG', payload: 'Project exported JSON.' });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const project = JSON.parse(text) as AURAProject;
        if (project.schemaVersion && project.app === 'AURA Command') {
          if (window.confirm('Replace current project?')) {
            dispatch({ type: 'LOAD_PROJECT', payload: project });
            dispatch({ type: 'ADD_LOG', payload: 'Project imported JSON.' });
          }
        } else {
          alert('Invalid project file.');
        }
      } catch (err) {
        alert('Failed to parse JSON.');
      }
    };
    reader.readAsText(file);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div 
      className="h-12 border-b flex items-center justify-between px-4 shrink-0 shadow-lg z-20"
      style={{ backgroundColor: activeTheme.panelBg, borderColor: activeTheme.border, color: activeTheme.textPrimary }}
    >
      <div className="flex items-center space-x-6">
        <div className="font-bold tracking-tight select-none flex items-center space-x-2">
           <svg className="w-6 h-6" style={{ color: activeTheme.primary }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 19h20L12 2zm0 3.8L18.4 17H5.6L12 5.8z"/></svg>
           <span className="text-white">AURA <span className="opacity-80 font-light" style={{ color: activeTheme.textSecondary }}>COMMAND</span></span>
        </div>
        <div className="h-4 w-px" style={{ backgroundColor: activeTheme.border }} />
        <div className="text-xs font-medium px-3 py-1 rounded border flex items-center space-x-2" style={{ backgroundColor: activeTheme.panelBg2, borderColor: activeTheme.border }}>
          <span className="opacity-50" style={{ color: activeTheme.textSecondary }}>Project:</span>
          <span className="text-blue-400">{state.project.project.name}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="tb-btn" onClick={() => {
            if(window.confirm('Reset to new project?')) {
                dispatch({ type: 'RESET_DEFAULT' });
            }
        }}>
           <PlusSquare size={16} /> New
        </button>
        <button className="tb-btn" onClick={() => {
            // Already auto-saving, but give feedback
            dispatch({ type: 'ADD_LOG', payload: 'Project manually saved.' });
        }}>
           <Save size={16} /> Save
        </button>
        {/* Load is mostly handled by auto-load from localStorage. No separate 'load' logic needed if it syncs. */}

        <div className="flex space-x-1">
            <button className="tb-icon-btn" onClick={() => fileInputRef.current?.click()} title="Import JSON">
               <Upload size={16} />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleImport} />
            
            <button className="tb-icon-btn" onClick={handleExport} title="Export JSON">
               <Download size={16} />
            </button>
        </div>

        <div className="flex rounded p-0.5 border" style={{ backgroundColor: activeTheme.canvasBg, borderColor: activeTheme.border }}>
           <button 
             className={`px-3 py-1 text-[11px] font-bold rounded shadow-sm transition-colors ${!state.previewMode ? 'text-white' : 'opacity-50 hover:opacity-100'}`}
             style={{ backgroundColor: !state.previewMode ? activeTheme.primary : 'transparent' }}
             onClick={() => dispatch({ type: 'SET_PREVIEW_MODE', payload: false })}
           >
             DESIGNER
           </button>
           <button 
             className={`px-3 py-1 text-[11px] font-bold rounded shadow-sm transition-colors ${state.previewMode ? 'text-white' : 'opacity-50 hover:opacity-100'}`}
             style={{ backgroundColor: state.previewMode ? '#ea580c' : 'transparent' }}
             onClick={() => dispatch({ type: 'SET_PREVIEW_MODE', payload: true })}
           >
             PREVIEW
           </button>
        </div>
      </div>
    </div>
  );
};

// Polyfill for Square since it wasn't imported above directly 
// Wait, I can just import it from lucide-react directly
import { Square } from 'lucide-react';
