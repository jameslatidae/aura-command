import React, { useState } from 'react';
import { useStore } from '../store';
import { ButtonWidget } from '../types';
import { BUTTON_PRESETS } from '../constants/buttonPresets';
import { ICON_MAP } from '../constants/icons';
import { Trash2 } from 'lucide-react';

export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="flex flex-col gap-1 w-full mb-3">
        <label className="text-[9px] opacity-70 block mb-1 uppercase tracking-tighter">{label}</label>
        {children}
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-[#2d2d35]">
            <button className="w-full flex items-center justify-between p-3 text-[10px] font-bold hover:bg-black/20 transition-colors uppercase tracking-widest" onClick={() => setOpen(!open)}>
                {title}
                <span className="text-slate-500">{open ? 'â¼' : 'â¶'}</span>
            </button>
            {open && <div className="p-3 pt-0">{children}</div>}
        </div>
    );
};

export const ButtonInspector: React.FC<{ widget: ButtonWidget }> = ({ widget }) => {
    const { dispatch } = useStore();

    const update = (updates: any) => dispatch({ type: 'UPDATE_WIDGET', payload: { id: widget.id, updates } });
    const updateGeo = (geo: any) => update({ geometry: { ...widget.geometry, ...geo } });
    const updateText = (tc: any) => update({ textConfig: { ...widget.textConfig, ...tc } });
    const updateIcon = (ic: any) => update({ iconConfig: { ...widget.iconConfig, ...ic } });
    const updateLayout = (lc: any) => update({ contentLayout: { ...widget.contentLayout, ...lc } });
    const updateShape = (sc: any) => update({ shapeStyle: { ...widget.shapeStyle, ...sc } });
    const updateStateStyle = (stateKey: string, sc: any) => update({ statesStyle: { ...widget.statesStyle, [stateKey]: { ...(widget.statesStyle as any)[stateKey], ...sc } } });
    const updateAction = (ac: any) => update({ action: { ...widget.action, ...ac } });

    const applyPreset = (presetId: string) => {
        const preset = BUTTON_PRESETS.find(p => p.id === presetId);
        if (preset) {
            update(preset.modifier(widget));
            dispatch({ type: 'ADD_LOG', payload: `Applied button preset: \${preset.name}` });
        }
    };

    return (
        <div className="flex flex-col p-4 space-y-6">
            <div className="flex justify-between items-center bg-black/20 p-2 rounded border border-[#2d2d35]">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest text-[#4f46e5]">Smart Button</span>
                <button 
                  onClick={() => window.confirm('Delete this button?') && dispatch({ type: 'DELETE_WIDGET', payload: widget.id })}
                  className="text-red-500 hover:text-red-400 p-1 transition-colors"
                >
                    <Trash2 size={14} />
                </button>
            </div>

            <section>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3 text-[#6b7280]">General</div>
                <Field label="Button Name (Internal)">
                    <input type="text" className="inspector-input" value={widget.name} onChange={e => update({ name: e.target.value })} />
                </Field>
                <Field label="Label">
                    <input type="text" className="inspector-input" value={widget.label} onChange={e => update({ label: e.target.value })} />
                </Field>
                <Field label="Presets">
                    <select 
                      className="inspector-input flex-1"
                      value=""
                      onChange={e => {
                          if (e.target.value) applyPreset(e.target.value);
                      }}
                    >
                        <option value="">Choose to apply...</option>
                        {BUTTON_PRESETS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </Field>
            </section>

            <div className="h-px w-full my-2 bg-[#2d2d35]" />

            <section>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3 text-[#6b7280]">Geometry</div>
                <div className="grid grid-cols-2 gap-3 w-full">
                    <Field label="X"><input type="number" className="inspector-input" value={widget.geometry.x} onChange={e => updateGeo({ x: Number(e.target.value) })} /></Field>
                    <Field label="Y"><input type="number" className="inspector-input" value={widget.geometry.y} onChange={e => updateGeo({ y: Number(e.target.value) })} /></Field>
                    <Field label="W"><input type="number" className="inspector-input text-blue-400" value={widget.geometry.w} onChange={e => updateGeo({ w: Number(e.target.value) })} /></Field>
                    <Field label="H"><input type="number" className="inspector-input text-blue-400" value={widget.geometry.h} onChange={e => updateGeo({ h: Number(e.target.value) })} /></Field>
                </div>
            </section>

            <div className="h-px w-full my-2 bg-[#2d2d35]" />

            <section>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center justify-between cursor-pointer text-[#6b7280]">
                   Style & Shape
                </div>
                <div className="grid grid-cols-2 gap-3 mb-2">
                    <Field label="Bg Color">
                        <input type="text" className="inspector-input" value={widget.shapeStyle.backgroundColor} onChange={e => updateShape({ backgroundColor: e.target.value })} />
                    </Field>
                    <Field label="Border Color">
                        <input type="text" className="inspector-input" value={widget.shapeStyle.borderColor} onChange={e => updateShape({ borderColor: e.target.value })} />
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Field label="Border Width"><input type="number" className="inspector-input" value={widget.shapeStyle.borderWidth} onChange={e => updateShape({ borderWidth: Number(e.target.value) })} /></Field>
                    <Field label="Border Radius"><input type="number" className="inspector-input" value={widget.shapeStyle.borderRadius} onChange={e => updateShape({ borderRadius: Number(e.target.value) })} /></Field>
                </div>
            </section>

            <div className="h-px w-full my-2 bg-[#2d2d35]" />

            <Section title="States Overrides">
                 {['normal', 'pressed', 'busy', 'success', 'error', 'disabled'].map(state => {
                     const st = (widget.statesStyle as any)[state];
                     return (
                         <div key={state} className="mb-2 p-2 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                             <div className="text-[10px] font-bold capitalize mb-2">{state}</div>
                             <div className="grid grid-cols-2 gap-3">
                                <Field label="Bg Color"><input type="text" className="inspector-input" value={st.backgroundColor || ''} placeholder="inherit" onChange={e => updateStateStyle(state, { backgroundColor: e.target.value })} /></Field>
                                <Field label="Text Color"><input type="text" className="inspector-input" value={st.textColor || ''} placeholder="inherit" onChange={e => updateStateStyle(state, { textColor: e.target.value })} /></Field>
                             </div>
                         </div>
                     );
                 })}
            </Section>

            <div className="h-px w-full my-2 bg-[#2d2d35]" />

            <Section title="Text Formatting">
                <Field label="Font Size"><input type="number" className="inspector-input" value={widget.textConfig.fontSize} onChange={e => updateText({ fontSize: Number(e.target.value) })} /></Field>
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Weight">
                        <select className="inspector-input" value={widget.textConfig.fontWeight} onChange={e => updateText({ fontWeight: e.target.value })}>
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                        </select>
                    </Field>
                    <Field label="Uppercase">
                         <input type="checkbox" checked={widget.textConfig.uppercase} onChange={e => updateText({ uppercase: e.target.checked })} />
                    </Field>
                </div>
            </Section>

            <div className="h-px w-full my-2 bg-[#2d2d35]" />

            <Section title="Icon">
                <label className="flex items-center gap-2 text-[10px] mb-4 cursor-pointer">
                    <input type="checkbox" checked={widget.iconConfig.enabled} onChange={e => updateIcon({ enabled: e.target.checked })} />
                    Enable Built-in Icon
                </label>
                {widget.iconConfig.enabled && (
                    <>
                        <Field label="Icon Name">
                            <select className="inspector-input" value={widget.iconConfig.name} onChange={e => updateIcon({ name: e.target.value })}>
                                {Object.keys(ICON_MAP).map(k => <option key={k} value={k}>{k}</option>)}
                            </select>
                        </Field>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Size"><input type="number" className="inspector-input" value={widget.iconConfig.size} onChange={e => updateIcon({ size: Number(e.target.value) })} /></Field>
                            <Field label="Spacing"><input type="number" className="inspector-input" value={widget.iconConfig.spacing} onChange={e => updateIcon({ spacing: Number(e.target.value) })} /></Field>
                        </div>
                    </>
                )}
            </Section>

            <div className="h-px w-full my-2 bg-[#2d2d35]" />

            <Section title="Content Layout">
                 <Field label="Direction">
                    <select className="inspector-input" value={widget.contentLayout.direction} onChange={e => updateLayout({ direction: e.target.value })}>
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                        <option value="icon-only">Icon Only</option>
                        <option value="text-only">Text Only</option>
                    </select>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Horiz Align">
                        <select className="inspector-input" value={widget.contentLayout.hAlign} onChange={e => updateLayout({ hAlign: e.target.value })}>
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </Field>
                    <Field label="Vert Align">
                        <select className="inspector-input" value={widget.contentLayout.vAlign} onChange={e => updateLayout({ vAlign: e.target.value })}>
                            <option value="top">Top</option>
                            <option value="middle">Middle</option>
                            <option value="bottom">Bottom</option>
                        </select>
                    </Field>
                </div>
            </Section>

            <div className="h-px w-full my-2 bg-[#2d2d35]" />

            <section>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3 text-[#6b7280]">Action Configuration</div>
                <label className="flex items-center gap-2 text-[10px] mb-4 cursor-pointer">
                    <input type="checkbox" checked={widget.action.enabled} onChange={e => updateAction({ enabled: e.target.checked })} />
                    Enable Action Engine
                </label>
                
                {widget.action.enabled && (
                    <div className="flex flex-col gap-3">
                        <div className="p-3 rounded border space-y-2 bg-black/20 border-[#2d2d35]">
                           <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] opacity-70 font-bold uppercase">Protocol</span>
                             <select className="inspector-input w-auto p-1" value={widget.action.protocol} onChange={e => updateAction({ protocol: e.target.value })}>
                                 <option value="none">None</option>
                                 <option value="http">HTTP</option>
                                 <option value="tcp-simulated">TCP (Sim)</option>
                             </select>
                           </div>

                        {widget.action.protocol === 'http' && (
                            <>
                                <div className="text-[9px] opacity-50 italic mb-2">HTTP / Webhooks (Fetch API wrapper)</div>
                                <div className="grid grid-cols-[80px_1fr] gap-2 mb-2">
                                    <Field label="Method">
                                        <select className="inspector-input" value={widget.action.httpMethod} onChange={e => updateAction({ httpMethod: e.target.value })}>
                                            <option value="GET">GET</option>
                                            <option value="POST">POST</option>
                                            <option value="PUT">PUT</option>
                                        </select>
                                    </Field>
                                    <Field label="URL"><input type="text" className="inspector-input" value={widget.action.url} onChange={e => updateAction({ url: e.target.value })} /></Field>
                                </div>
                                {(widget.action.httpMethod === 'POST' || widget.action.httpMethod === 'PUT') && (
                                    <Field label="Body">
                                        <textarea className="inspector-input h-16 resize-y text-[10px]" value={widget.action.httpBody} onChange={e => updateAction({ httpBody: e.target.value })} />
                                    </Field>
                                )}
                            </>
                        )}

                        {widget.action.protocol === 'tcp-simulated' && (
                            <>
                                <div className="text-[9px] opacity-50 italic mb-2">Simulates a raw TCP packet exchange locally. Real TCP is blocked by browsers.</div>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Host"><input type="text" className="inspector-input" value={widget.action.tcpHost} onChange={e => updateAction({ tcpHost: e.target.value })} /></Field>
                                    <Field label="Port"><input type="number" className="inspector-input" value={widget.action.tcpPort} onChange={e => updateAction({ tcpPort: Number(e.target.value) })} /></Field>
                                </div>
                                <Field label="Payload Format">
                                    <select className="inspector-input" value={widget.action.payloadFormat} onChange={e => updateAction({ payloadFormat: e.target.value })}>
                                        <option value="text">String</option>
                                        <option value="hex">Hex</option>
                                        <option value="json">JSON</option>
                                    </select>
                                </Field>
                                <Field label="Payload">
                                    <textarea className="inspector-input h-16 resize-y text-[10px]" value={widget.action.payload} onChange={e => updateAction({ payload: e.target.value })} />
                                </Field>
                                <Field label="Mock Reply Data">
                                    <input type="text" className="inspector-input text-[10px]" value={widget.action.mockReply} onChange={e => updateAction({ mockReply: e.target.value })} />
                                </Field>
                            </>
                        )}
                        </div>
                        
                        <div className="h-px my-2 bg-[#2d2d35]" />
                        
                        <label className="flex items-center gap-2 text-[10px] mb-2 cursor-pointer text-[#4f46e5]">
                            <input type="checkbox" checked={widget.action.expectReply} onChange={e => updateAction({ expectReply: e.target.checked })} />
                            Validate Reply (Two-Way)
                        </label>
                        
                        {widget.action.expectReply && (
                            <div className="flex flex-col gap-3 p-3 rounded mb-2 border bg-black/20 border-[#2d2d35]">
                                <Field label="Reply Match Strategy">
                                    <select className="inspector-input" value={widget.action.expectedReplyMatchType} onChange={e => updateAction({ expectedReplyMatchType: e.target.value })}>
                                        <option value="equals">Exact Equals</option>
                                        <option value="contains">Contains String</option>
                                        <option value="containsHex">Contains Hex</option>
                                        <option value="regex">Regular Expression</option>
                                    </select>
                                </Field>
                                <Field label="Expected Value">
                                    <input type="text" className="inspector-input font-mono text-xs" value={widget.action.expectedReplyValue} onChange={e => updateAction({ expectedReplyValue: e.target.value })} />
                                </Field>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <Field label="State on SUCCESS">
                             <select className="inspector-input" value={widget.action.onSuccessState} onChange={e => updateAction({ onSuccessState: e.target.value })}>
                                 <option value="none">No change</option>
                                 <option value="normal">Revert to Normal</option>
                                 <option value="success">Flash Success Color</option>
                             </select>
                        </Field>

                        <Field label="State transition on FAIL">
                             <select className="inspector-input" value={widget.action.onFailState} onChange={e => updateAction({ onFailState: e.target.value })}>
                                 <option value="none">No change</option>
                                 <option value="normal">Revert to Normal</option>
                                 <option value="error">Flash Error Color</option>
                             </select>
                        </Field>
                        </div>

                    </div>
                )}
            </section>
            
            <div className="h-20" /> {/* scroll padding */}
        </div>
    );
};
