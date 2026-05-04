import React from 'react';
import { useStore } from '../store';
import { ButtonWidget } from '../types';
import { ButtonInspector, Field } from './ButtonInspector';

export const Inspector: React.FC = () => {
  const { state, dispatch, activeTheme } = useStore();
  const selectedWidget = state.project.widgets.find(w => w.id === state.selectedWidgetId);

  return (
    <div 
      className="w-72 border-l flex flex-col shrink-0 overflow-y-auto custom-scroll z-20"
      style={{ backgroundColor: activeTheme.panelBg, borderColor: activeTheme.border, color: activeTheme.textPrimary }}
    >
      <div className="h-10 border-b flex items-center px-4 space-x-4 shrink-0" style={{ borderColor: activeTheme.border }}>
        <span 
          className={`text-xs font-bold border-b-2 h-full flex items-center cursor-pointer transition-colors ${state.selectedWidgetId ? 'border-transparent opacity-50' : ''}`}
          style={{ borderColor: !state.selectedWidgetId ? activeTheme.primary : 'transparent', color: !state.selectedWidgetId ? activeTheme.textPrimary : activeTheme.textSecondary }}
          onClick={() => dispatch({ type: 'SET_WIDGET_SELECTED', payload: null })}
        >
          PAGE
        </span>
        <span 
          className={`text-xs font-bold border-b-2 h-full flex items-center cursor-pointer transition-colors ${!state.selectedWidgetId ? 'border-transparent opacity-50' : ''}`}
          style={{ borderColor: state.selectedWidgetId ? activeTheme.primary : 'transparent', color: state.selectedWidgetId ? activeTheme.textPrimary : activeTheme.textSecondary }}
        >
          WIDGET
        </span>
      </div>

      {selectedWidget && !state.previewMode ? (
        <ButtonInspector widget={selectedWidget as ButtonWidget} />
      ) : (
        <PageInspector />
      )}
    </div>
  );
};

export const PageInspector: React.FC = () => {
    const { state, dispatch, activeTheme } = useStore();
    const page = state.project.page;
    
    const PRESETS = [
        { label: '800 x 480', w: 800, h: 480 },
        { label: '1024 x 600', w: 1024, h: 600 },
        { label: '1280 x 720', w: 1280, h: 720 },
        { label: '1280 x 800', w: 1280, h: 800 },
        { label: '1366 x 768', w: 1366, h: 768 },
        { label: '1920 x 1080', w: 1920, h: 1080 },
        { label: '1920 x 1200', w: 1920, h: 1200 },
    ];

    return (
        <div className="p-4 flex flex-col gap-6">
            <section>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: activeTheme.textSecondary }}>Page Settings</div>
                <Field label="Page Name">
                    <input 
                      type="text" 
                      className="inspector-input" 
                      value={page.name} 
                      onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { name: e.target.value } })} 
                    />
                </Field>
                <Field label="Size Preset">
                    <select 
                      className="inspector-input"
                      onChange={e => {
                          const [w, h] = e.target.value.split('x').map(Number);
                          if (w && h) dispatch({ type: 'UPDATE_PAGE', payload: { width: w, height: h }});
                      }}
                      value={`\${page.width}x\${page.height}`}
                    >
                        <option value="custom">Custom...</option>
                        {PRESETS.map(p => <option key={p.label} value={`\${p.w}x\${p.h}`}>{p.label}</option>)}
                    </select>
                </Field>
                <div className="flex gap-2">
                    <Field label="Width">
                        <input type="number" className="inspector-input" value={page.width} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { width: Number(e.target.value) } })} />
                    </Field>
                    <Field label="Height">
                        <input type="number" className="inspector-input" value={page.height} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { height: Number(e.target.value) } })} />
                    </Field>
                </div>
            </section>

            <div className="h-px w-full my-2" style={{ backgroundColor: activeTheme.border }} />

            <section>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: activeTheme.textSecondary }}>Background Editor</div>
                <div className="text-[9px] opacity-70 mb-2 italic">Note: Theme overrides default bg unless custom colors set.</div>
                <Field label="Type">
                    <select className="inspector-input" value={page.backgroundType} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { backgroundType: e.target.value as any } })}>
                        <option value="solid">Solid Color</option>
                        <option value="gradient">Gradient</option>
                    </select>
                </Field>
                <div className="flex gap-2">
                    <Field label="Color 1">
                        <input type="color" className="inspector-color w-full" value={page.backgroundColor || '#000000'} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { backgroundColor: e.target.value } })} />
                    </Field>
                    {page.backgroundType === 'gradient' && (
                        <Field label="Color 2">
                            <input type="color" className="inspector-color w-full" value={page.backgroundColor2 || '#000000'} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { backgroundColor2: e.target.value } })} />
                        </Field>
                    )}
                </div>
            </section>

            <div className="h-px w-full my-2" style={{ backgroundColor: activeTheme.border }} />
            
            <section>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: activeTheme.textSecondary }}>Grid & Snap</div>
                <label className="flex items-center gap-2 text-[10px] mb-2 cursor-pointer">
                    <input type="checkbox" checked={page.gridEnabled} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { gridEnabled: e.target.checked } })} />
                    Show Grid
                </label>
                <label className="flex items-center gap-2 text-sm mb-4">
                    <input type="checkbox" checked={page.snapToGrid} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { snapToGrid: e.target.checked } })} />
                    Snap to Grid
                </label>
                <Field label="Grid Size (px)">
                    <input type="number" className="inspector-input" value={page.gridSize} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { gridSize: Number(e.target.value) } })} />
                </Field>
            </section>
        </div>
    );
};

// ... ButtonInspector next
