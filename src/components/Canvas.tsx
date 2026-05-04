import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '../store';
import { SmartButton } from './SmartButton';
import { Geometry } from '../types';

export const Canvas: React.FC = () => {
  const { state, dispatch, activeTheme } = useStore();
  const page = state.project.page;
  const isPreview = state.previewMode;

  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  // Auto zoom to fit initially
  useEffect(() => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      const parent = canvasRef.current.parentElement;
      const scaleX = (parent.clientWidth - 40) / page.width;
      const scaleY = (parent.clientHeight - 40) / page.height;
      let newZoom = Math.min(scaleX, scaleY, 1);
      if (newZoom < 0.2) newZoom = 0.2;
      setZoom(newZoom);
    }
  }, [page.width, page.height, isPreview]);

  const backgroundStyle: React.CSSProperties = {
    width: page.width,
    height: page.height,
    position: 'relative',
    backgroundColor: page.backgroundType === 'solid' ? (page.backgroundColor || activeTheme.canvasBg) : undefined,
    backgroundImage: page.backgroundType === 'gradient' ? `linear-gradient(135deg, \${page.backgroundColor || activeTheme.canvasBg}, \${page.backgroundColor2 || activeTheme.canvasBg2})` : undefined,
    transform: `scale(\${zoom})`,
    transformOrigin: 'top center',
    boxShadow: isPreview ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.2s ease-out'
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current && !isPreview) {
      dispatch({ type: 'SET_WIDGET_SELECTED', payload: null });
    }
  };

  return (
    <div className="w-full h-full overflow-auto flex items-start justify-center p-8 bg-black/50 select-none">
      <div 
        ref={canvasRef}
        style={backgroundStyle}
        onClick={handleCanvasClick}
        className="relative"
      >
        {/* Render Grid if enabled */}
        {!isPreview && page.gridEnabled && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: `\${page.gridSize}px \${page.gridSize}px`
            }}
          />
        )}
        
        {state.project.widgets.map((w) => (
          <DraggableWidgetWrapper key={w.id} id={w.id} geo={w.geometry} zoom={zoom} isPreview={isPreview}>
             <SmartButton widget={w} isPreview={isPreview} />
          </DraggableWidgetWrapper>
        ))}
      </div>
    </div>
  );
};

// Hand-rolled drag/resize to avoid big external libraries when simple is sufficient
const DraggableWidgetWrapper: React.FC<{ id: string; geo: Geometry; zoom: number; isPreview: boolean; children: React.ReactNode }> = ({ id, geo, zoom, isPreview, children }) => {
  const { state, dispatch } = useStore();
  const selected = state.selectedWidgetId === id && !isPreview;
  const page = state.project.page;
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null); // 'br', 'r', 'b'
  const [localGeo, setLocalGeo] = useState(geo);

  useEffect(() => { setLocalGeo(geo); }, [geo]);

  const snap = (v: number) => page.snapToGrid ? Math.round(v / page.gridSize) * page.gridSize : v;

  const handleMouseDown = (e: React.MouseEvent, type: string) => {
    if (isPreview) return;
    e.stopPropagation();
    if (type === 'drag') {
      dispatch({ type: 'SET_WIDGET_SELECTED', payload: id });
      setIsDragging(true);
    } else {
      setIsResizing(type);
    }
    
    // Global mouse listeners
    const startX = e.clientX;
    const startY = e.clientY;
    const startGeo = { ...localGeo };

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = (moveEvent.clientX - startX) / zoom;
      const dy = (moveEvent.clientY - startY) / zoom;
      
      const nextGeo = { ...startGeo };
      
      if (type === 'drag') {
        nextGeo.x = snap(startGeo.x + dx);
        nextGeo.y = snap(startGeo.y + dy);
      } else if (type === 'br') {
        nextGeo.w = Math.max(20, snap(startGeo.w + dx));
        nextGeo.h = Math.max(20, snap(startGeo.h + dy));
      } else if (type === 'r') {
        nextGeo.w = Math.max(20, snap(startGeo.w + dx));
      } else if (type === 'b') {
        nextGeo.h = Math.max(20, snap(startGeo.h + dy));
      }
      
      setLocalGeo(nextGeo);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      // Dispatch final position
      // Using Functional state update trick to ensure latest is snagged, or just read localGeo 
      // Need a way to pass the updated geo. We do it inside a setTimeout to grab state.
      setTimeout(() => {
        setLocalGeo(currentLocalGeo => {
           dispatch({ type: 'UPDATE_WIDGET', payload: { id, updates: { geometry: currentLocalGeo } } });
           return currentLocalGeo;
        });
      }, 0);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      onMouseDown={(e) => handleMouseDown(e, 'drag')}
      className={`absolute \${selected ? 'ring-2 ring-blue-500 z-50' : 'hover:ring-1 hover:ring-blue-400/50 z-10'}`}
      style={{
        left: localGeo.x,
        top: localGeo.y,
        width: localGeo.w,
        height: localGeo.h,
        cursor: isPreview ? 'default' : (isDragging ? 'grabbing' : 'grab')
      }}
    >
      {children}
      
      {selected && !isPreview && (
        <>
          {/* Resize handles */}
          <div onMouseDown={(e) => handleMouseDown(e, 'r')} className="absolute right-0 top-1/2 -mt-1.5 w-3 h-3 translate-x-1.5 bg-blue-500 rounded-full cursor-e-resize shadow" />
          <div onMouseDown={(e) => handleMouseDown(e, 'b')} className="absolute bottom-0 left-1/2 -ml-1.5 w-3 h-3 translate-y-1.5 bg-blue-500 rounded-full cursor-s-resize shadow" />
          <div onMouseDown={(e) => handleMouseDown(e, 'br')} className="absolute bottom-0 right-0 w-3 h-3 translate-x-1.5 translate-y-1.5 bg-white border-2 border-blue-500 rounded-sm cursor-nwse-resize shadow" />
        </>
      )}
    </div>
  );
};
