import React from 'react';
import { useStore } from '../store';
import { ButtonWidget } from '../types';
import { ButtonInspector, Field } from './ButtonInspector';
import { THEMES } from '../constants/themes';

export const Inspector: React.FC = () => {
  const { state } = useStore();
  const selectedWidget = state.project.widgets.find(w => w.id === state.selectedWidgetId);

  return (
    <div className="w-72 border-l flex flex-col shrink-0 overflow-y-auto custom-scroll z-20 bg-[#16161a] border-[#2d2d35] text-[#d1d5db]">
      <div className="h-10 border-b flex items-center px-4 shrink-0 border-[#2d2d35]">
        <span className="text-xs font-bold text-[#d1d5db] tracking-widest uppercase">
          {selectedWidget && !state.previewMode ? 'Widget Properties' : 'Page Properties'}
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
    const { state, dispatch } = useStore();
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
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3 text-[#6b7280]">Page Settings</div>
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
                      value={`${page.width}x${page.height}`}
                    >
                        <option value="custom">Custom...</option>
                        {PRESETS.map(p => <option key={p.label} value={`${p.w}x${p.h}`}>{p.label}</option>)}
                    </select>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Width">
                        <input type="number" className="inspector-input font-mono text-blue-400" value={page.width} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { width: Number(e.target.value) } })} />
                    </Field>
                    <Field label="Height">
                        <input type="number" className="inspector-input font-mono text-blue-400" value={page.height} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { height: Number(e.target.value) } })} />
                    </Field>
                </div>
            </section>
            
            <div className="h-px w-full my-2 bg-[#2d2d35]" />

            <section>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3 text-[#6b7280]">Background Style</div>
                
                <Field label="Page Preset">
                    <select className="inspector-input mb-3" value={state.project.themeId} onChange={e => dispatch({ type: 'SET_THEME', payload: e.target.value })}>
                        {THEMES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                </Field>

                <Field label="Background Type">
                    <select className="inspector-input appearance-none" value={page.backgroundType} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { backgroundType: e.target.value as any } })}>
                        <option value="theme">Preset Default</option>
                        <option value="solid">Solid Color (Override)</option>
                        <option value="gradient">Gradient (Override)</option>
                    </select>
                </Field>
                {page.backgroundType !== 'theme' && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                      <Field label="Color 1">
                          <input type="color" className="inspector-color w-full" value={page.backgroundColor || '#000000'} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { backgroundColor: e.target.value } })} />
                      </Field>
                      {page.backgroundType === 'gradient' && (
                          <Field label="Color 2">
                              <input type="color" className="inspector-color w-full" value={page.backgroundColor2 || '#000000'} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { backgroundColor2: e.target.value } })} />
                          </Field>
                      )}
                  </div>
                )}
            </section>

            <div className="h-px w-full my-2 bg-[#2d2d35]" />
            
            <section>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3 text-[#6b7280]">Grid & Snap</div>
                <label className="flex items-center gap-2 text-[10px] mb-2 cursor-pointer">
                    <input type="checkbox" checked={page.gridEnabled} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { gridEnabled: e.target.checked } })} />
                    Show Grid
                </label>
                <label className="flex items-center gap-2 text-[10px] mb-4 cursor-pointer">
                    <input type="checkbox" checked={page.snapToGrid} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { snapToGrid: e.target.checked } })} />
                    Snap to Grid
                </label>
                <Field label="Grid Size (px)">
                    <select className="inspector-input" value={page.gridSize} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { gridSize: Number(e.target.value) } })}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </Field>
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <Field label="Opacity">
                        <input type="number" step="0.05" min="0" max="1" className="inspector-input" value={page.gridOpacity ?? 0.25} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { gridOpacity: Number(e.target.value) } })} />
                    </Field>
                    <Field label="Color">
                        <input type="color" className="inspector-color w-full" value={page.gridColor || '#ffffff'} onChange={e => dispatch({ type: 'UPDATE_PAGE', payload: { gridColor: e.target.value } })} />
                    </Field>
                </div>
            </section>
        </div>
    );
};


// ... ButtonInspector next
