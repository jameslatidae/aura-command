import React from 'react';
import { ProjectProvider } from './store';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { Inspector } from './components/Inspector';
import { DebugBar } from './components/DebugBar';

export default function App() {
  return (
    <ProjectProvider>
      <div className="w-screen h-screen flex flex-col font-sans overflow-hidden select-none" style={{ backgroundColor: '#0a0a0b', color: '#d1d5db' }}>
        <TopBar />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col relative overflow-hidden" style={{ backgroundColor: '#0a0a0b' }}>
             <Canvas />
             <DebugBar />
          </div>
          <Inspector />
        </div>
      </div>
    </ProjectProvider>
  );
}
