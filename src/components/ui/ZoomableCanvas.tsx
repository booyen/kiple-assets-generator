'use client';

import { useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { ZoomIn, ZoomOut, Maximize, Move, RotateCcw } from 'lucide-react';

interface ZoomableCanvasProps {
  children: ReactNode;
  minZoom?: number;
  maxZoom?: number;
  initialZoom?: number;
}

export function ZoomableCanvas({
  children,
  minZoom = 0.25,
  maxZoom = 2,
  initialZoom = 0.7,
}: ZoomableCanvasProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Zoom presets
  const zoomPresets = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.1, maxZoom));
  }, [maxZoom]);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.1, minZoom));
  }, [minZoom]);

  const handleZoomReset = useCallback(() => {
    setZoom(initialZoom);
    setPosition({ x: 0, y: 0 });
  }, [initialZoom]);

  const handleFitToScreen = useCallback(() => {
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current.getBoundingClientRect();

      const scaleX = (container.width - 80) / 375; // screen width
      const scaleY = (container.height - 80) / 812; // screen height
      const newZoom = Math.min(scaleX, scaleY, maxZoom);

      setZoom(Math.max(minZoom, Math.min(newZoom, maxZoom)));
      setPosition({ x: 0, y: 0 });
    }
  }, [minZoom, maxZoom]);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((prev) => Math.max(minZoom, Math.min(prev + delta, maxZoom)));
    }
  }, [minZoom, maxZoom]);

  // Drag to pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  }, [position]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          handleZoomIn();
        }
      } else if (e.key === '-') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          handleZoomOut();
        }
      } else if (e.key === '0') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          handleZoomReset();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleZoomIn, handleZoomOut, handleZoomReset]);

  return (
    <div className="relative flex-1 flex flex-col min-h-0">
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white rounded-lg shadow-lg border border-slate-200 p-1">
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-slate-100 rounded-md transition-colors"
          title="Zoom Out (Ctrl+-)"
        >
          <ZoomOut size={18} className="text-slate-600" />
        </button>

        <select
          value={zoom.toFixed(2)}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="w-20 text-center text-sm bg-transparent border-0 focus:outline-none cursor-pointer"
        >
          {zoomPresets.map((preset) => (
            <option key={preset} value={preset.toFixed(2)}>
              {Math.round(preset * 100)}%
            </option>
          ))}
        </select>

        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-slate-100 rounded-md transition-colors"
          title="Zoom In (Ctrl++)"
        >
          <ZoomIn size={18} className="text-slate-600" />
        </button>

        <div className="w-px h-6 bg-slate-200" />

        <button
          onClick={handleFitToScreen}
          className="p-2 hover:bg-slate-100 rounded-md transition-colors"
          title="Fit to Screen"
        >
          <Maximize size={18} className="text-slate-600" />
        </button>

        <button
          onClick={handleZoomReset}
          className="p-2 hover:bg-slate-100 rounded-md transition-colors"
          title="Reset View (Ctrl+0)"
        >
          <RotateCcw size={18} className="text-slate-600" />
        </button>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-16 right-4 z-20 flex items-center gap-1 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded">
        <Move size={12} />
        <span>Drag to pan</span>
      </div>

      {/* Canvas area */}
      <div
        ref={containerRef}
        className={`flex-1 relative overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            opacity: 0.3,
          }}
        />

        {/* Content container */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 75ms ease-out',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
