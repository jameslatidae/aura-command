import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useStore } from '../store';
import { SmartButton } from './SmartButton';
import { Geometry } from '../types';
import { ZoomIn, ZoomOut, Maximize, MousePointer2 } from 'lucide-react';

export const Canvas: React.FC = () => {
  const { state, dispatch, activeTheme } = useStore();
  const page = state.project.page;
  const isPreview = state.previewMode;

  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const fitToView = useCallback(() => {
    if (containerRef.current) {
      const parent = containerRef.current;
      const padding = 80;
      const scaleX = (parent.clientWidth - padding) / page.width;
      const scaleY = (parent.clientHeight - padding) / page.height;
      let newZoom = Math.min(scaleX, scaleY, 1);
      if (newZoom < 0.1) newZoom = 0.1;
      setZoom(newZoom);
      setPan({ x: 0, y: 0 });
    }
  }, [page.width, page.height]);

  useEffect(() => {
    fitToView();
  }, [page.width, page.height, isPreview, fitToView]); // Only auto-fit when size changes or entering preview

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = -e.deltaY * 0.001;
      setZoom(z => Math.min(Math.max(0.1, z + zoomFactor), 5));
    } else {
      setPan(p => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.nativeEvent.code === 'Space')) {
      // Middle click or Space+Click to pan
      setIsPanning(true);
      const startX = e.clientX - pan.x;
      const startY = e.clientY - pan.y;

      const onMouseMove = (moveEvent: MouseEvent) => {
        setPan({
          x: moveEvent.clientX - startX,
          y: moveEvent.clientY - startY
        });
      };
      const onMouseUp = () => {
        setIsPanning(false);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else if (e.target === e.currentTarget && !isPreview) {
        dispatch({ type: 'SET_WIDGET_SELECTED', payload: null });
    }
  };

  const backgroundStyle: React.CSSProperties = {
    width: page.width,
    height: page.height,
    position: 'relative',
    backgroundColor: page.backgroundType === 'solid' ? (page.backgroundColor || activeTheme.canvasBg) : (page.backgroundType === 'theme' ? activeTheme.canvasBg : undefined),
    backgroundImage: page.backgroundType === 'gradient' ? `linear-gradient(135deg, ${page.backgroundColor || activeTheme.canvasBg}, ${page.backgroundColor2 || activeTheme.canvasBg2})` : undefined,
    boxShadow: isPreview ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  };

  const gridStyle: React.CSSProperties = {
    opacity: page.gridOpacity ?? 0.25,
    backgroundImage: `linear-gradient(to right, ${page.gridColor || '#ffffff'} 1px, transparent 1px), linear-gradient(to bottom, ${page.gridColor || '#ffffff'} 1px, transparent 1px)`,
    backgroundSize: `${page.gridSize}px ${page.gridSize}px`
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full overflow-hidden relative select-none ${isPanning ? 'cursor-grabbing' : ''}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    >
      <div 
         className="absolute left-1/2 top-1/2"
         style={{ transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})` }}
      >
        <div style={backgroundStyle}>
          {/* Render Grid if enabled */}
          {!isPreview && page.gridEnabled && (
            <div className="absolute inset-0 pointer-events-none" style={gridStyle} />
          )}
          
          {state.project.widgets.map((w) => (
            <DraggableWidgetWrapper key={w.id} id={w.id} geo={w.geometry} zoom={zoom} isPreview={isPreview}>
               <SmartButton widget={w} isPreview={isPreview} />
            </DraggableWidgetWrapper>
          ))}
        </div>
      </div>

      {/* Viewport Controls Overlay */}
      {!isPreview && (
        <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-[#16161a] border border-[#2d2d35] p-1.5 rounded-lg shadow-xl z-30">
           <span className="text-[10px] font-mono font-bold w-12 text-center text-[#6b7280]">
              {Math.round(zoom * 100)}%
           </span>
           <div className="w-px h-4 bg-[#2d2d35]" />
           <button title="Zoom Out" className="p-1 hover:bg-[#2d2d35] rounded text-[#d1d5db]" onClick={() => setZoom(z => Math.max(0.1, z - 0.1))}>
              <ZoomOut size={14} />
           </button>
           <button title="100%" className="text-[10px] font-bold px-2 hover:bg-[#2d2d35] rounded text-[#d1d5db]" onClick={() => { setZoom(1); setPan({x: 0, y: 0}); }}>
              1:1
           </button>
           <button title="Fit to View" className="p-1 hover:bg-[#2d2d35] rounded text-[#d1d5db]" onClick={fitToView}>
              <Maximize size={14} />
           </button>
           <button title="Zoom In" className="p-1 hover:bg-[#2d2d35] rounded text-[#d1d5db]" onClick={() => setZoom(z => Math.min(5, z + 0.1))}>
              <ZoomIn size={14} />
           </button>
        </div>
      )}
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
  const geoRef = useRef(geo);

  useEffect(() => { 
    setLocalGeo(geo); 
    geoRef.current = geo;
  }, [geo]);

  const snap = (v: number) => page.snapToGrid ? Math.round(v / page.gridSize) * page.gridSize : v;

  const handleMouseDown = (e: React.MouseEvent, type: string) => {
    if (isPreview) return;
    if (e.button !== 0) return; // Only left click to drag/resize
    
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
    const startGeo = { ...geoRef.current };

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = (moveEvent.clientX - startX) / zoom;
      const dy = (moveEvent.clientY - startY) / zoom;
      
      const nextGeo = { ...startGeo };
      
      if (type === 'drag') {
        nextGeo.x = page.snapToGrid ? snap(startGeo.x + dx) : startGeo.x + dx;
        nextGeo.y = page.snapToGrid ? snap(startGeo.y + dy) : startGeo.y + dy;
      } else if (type === 'br') {
        let w = startGeo.w + dx;
        let h = startGeo.h + dy;
        // Snap the absolute right/bottom edge, not just the width
        if (page.snapToGrid) {
            w = snap(startGeo.x + startGeo.w + dx) - startGeo.x;
            h = snap(startGeo.y + startGeo.h + dy) - startGeo.y;
        }
        nextGeo.w = Math.max(20, w);
        nextGeo.h = Math.max(20, h);
      } else if (type === 'r') {
        let w = startGeo.w + dx;
        if (page.snapToGrid) w = snap(startGeo.x + startGeo.w + dx) - startGeo.x;
        nextGeo.w = Math.max(20, w);
      } else if (type === 'b') {
        let h = startGeo.h + dy;
        if (page.snapToGrid) h = snap(startGeo.y + startGeo.h + dy) - startGeo.y;
        nextGeo.h = Math.max(20, h);
      }
      
      geoRef.current = nextGeo;
      setLocalGeo(nextGeo);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      // Dispatch final position using the ref
      dispatch({ type: 'UPDATE_WIDGET', payload: { id, updates: { geometry: geoRef.current } } });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      onMouseDown={(e) => handleMouseDown(e, 'drag')}
      className={`absolute ${selected ? 'ring-2 ring-[#4f46e5] z-50' : 'hover:ring-1 hover:ring-[#4f46e5]/50 z-10'}`}
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
          <div onMouseDown={(e) => handleMouseDown(e, 'r')} className="absolute right-0 top-1/2 -mt-1.5 w-3 h-3 translate-x-1.5 bg-[#4f46e5] rounded-full cursor-e-resize shadow" />
          <div onMouseDown={(e) => handleMouseDown(e, 'b')} className="absolute bottom-0 left-1/2 -ml-1.5 w-3 h-3 translate-y-1.5 bg-[#4f46e5] rounded-full cursor-s-resize shadow" />
          <div onMouseDown={(e) => handleMouseDown(e, 'br')} className="absolute bottom-0 right-0 w-3 h-3 translate-x-1.5 translate-y-1.5 bg-white border-2 border-[#4f46e5] rounded-sm cursor-nwse-resize shadow" />
        </>
      )}
    </div>
  );
};
