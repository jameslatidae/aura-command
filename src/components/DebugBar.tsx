import React, { useState } from 'react';
import { useStore } from '../store';

export const DebugBar: React.FC = () => {
    const { state } = useStore();
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="relative z-20 flex flex-col">
            {expanded && (
                <div className="h-32 border-t flex flex-col shrink-0 font-mono text-[10px] z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] bg-[#16161a] border-[#2d2d35] text-[#6b7280]">
                    <div className="flex-1 overflow-y-auto p-2 custom-scroll flex flex-col-reverse">
                        <div className="flex flex-col justify-end">
                            {state.logs.map((log, i) => (
                                <div key={i} className="py-0.5 border-b border-[#2d2d35] break-all">
                                    {log}
                                </div>
                            ))}
                            {state.logs.length === 0 && <span className="opacity-50 italic">System ready... awaiting commands.</span>}
                        </div>
                    </div>
                </div>
            )}
        <footer className="h-8 border-t flex items-center justify-between px-3 shrink-0 text-[10px] font-mono z-20 bg-[#0a0a0b] border-[#2d2d35] text-[#6b7280]">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="opacity-60 uppercase tracking-tighter">Action Engine Ready</span>
                </div>
                <div className="h-3 w-px bg-[#2d2d35]" />
                <span className="opacity-60 truncate max-w-[300px]">
                   {state.selectedWidgetId ? `Selected: [${state.selectedWidgetId}]` : 'Ready'}
                </span>
            </div>
            <div className="flex items-center space-x-4 opacity-50">
               <span>SCHEMA {state.project.schemaVersion}</span>
               <button 
                 className="hover:text-white transition-colors"
                 onClick={() => setExpanded(!expanded)}
               >
                 {expanded ? 'HIDE LOGS' : 'SHOW LOGS'}
               </button>
            </div>
        </footer>
        </div>
    );
};
