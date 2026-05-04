import React from 'react';
import { ButtonWidget } from '../types';
import { useStore } from '../store';
import { ICON_MAP } from '../constants/icons';
import { executeButtonAction } from '../engine/ActionEngine';

export const SmartButton: React.FC<{ widget: ButtonWidget; isPreview: boolean }> = ({ widget, isPreview }) => {
  const { state, dispatch } = useStore();
  
  const handlePress = async () => {
    if (!isPreview || !widget.action.enabled) return;
    
    await executeButtonAction(state.project, widget, widget.action, {
      setBusy: () => dispatch({ type: 'SET_RUNTIME_STATE', payload: { id: widget.id, state: 'busy' } }),
      setSuccess: (lbl) => dispatch({ type: 'SET_RUNTIME_STATE', payload: { id: widget.id, state: 'success', labelOverride: lbl } }),
      setError: (lbl) => dispatch({ type: 'SET_RUNTIME_STATE', payload: { id: widget.id, state: 'error', labelOverride: lbl } }),
      setNormal: () => dispatch({ type: 'SET_RUNTIME_STATE', payload: { id: widget.id, state: 'normal', labelOverride: null } }),
      log: (msg) => dispatch({ type: 'ADD_LOG', payload: msg })
    });
  };

  const currentStateKey = widget.runtimeState?.state || 'normal';
  const stateOverrides = widget.statesStyle[currentStateKey as keyof typeof widget.statesStyle] || {};
  
  const finalBg = stateOverrides.backgroundColor || widget.shapeStyle.backgroundColor;
  const finalBorder = stateOverrides.borderColor || widget.shapeStyle.borderColor;
  const finalText = stateOverrides.textColor || widget.textConfig.textColor || '#ffffff';
  const finalIcon = stateOverrides.iconColor || widget.iconConfig.color || finalText;
  const finalOpacity = stateOverrides.opacity ?? widget.shapeStyle.opacity;

  const currentLabel = widget.runtimeState?.labelOverride || widget.label;

  const IconCmp = widget.iconConfig.enabled ? ICON_MAP[widget.iconConfig.name] : null;

  return (
    <div
      onClick={handlePress}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: finalBg,
        borderColor: finalBorder,
        borderWidth: widget.shapeStyle.borderWidth,
        borderStyle: 'solid',
        borderRadius: widget.shapeStyle.borderRadius,
        opacity: finalOpacity,
        boxShadow: widget.shapeStyle.shadowEnabled ? `0 \${widget.shapeStyle.shadowIntensity * 10}px \${widget.shapeStyle.shadowIntensity * 20}px rgba(0,0,0,0.5)` : 'none',
        backdropFilter: widget.shapeStyle.glassEffect ? 'blur(10px)' : 'none',
        display: 'flex',
        flexDirection: widget.contentLayout.direction === 'vertical' ? 'column' : 'row',
        justifyContent: widget.contentLayout.hAlign === 'left' ? 'flex-start' : widget.contentLayout.hAlign === 'right' ? 'flex-end' : widget.contentLayout.hAlign === 'space-between' ? 'space-between' : 'center',
        alignItems: widget.contentLayout.vAlign === 'top' ? 'flex-start' : widget.contentLayout.vAlign === 'bottom' ? 'flex-end' : 'center',
        paddingTop: widget.contentLayout.padding[0],
        paddingRight: widget.contentLayout.padding[1],
        paddingBottom: widget.contentLayout.padding[2],
        paddingLeft: widget.contentLayout.padding[3],
        gap: widget.contentLayout.gap,
        cursor: isPreview ? 'pointer' : 'default',
        transition: widget.interaction.pressAnimation ? 'all 0.1s ease-in-out' : 'none',
        transform: currentStateKey === 'pressed' && widget.interaction.pressAnimation ? 'scale(0.96)' : 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {widget.contentLayout.direction !== 'text-only' && IconCmp && (
        <div style={{
           position: widget.iconConfig.position === 'background' ? 'absolute' : 'relative',
           left: widget.iconConfig.position === 'background' ? '50%' : 'auto',
           top: widget.iconConfig.position === 'background' ? '50%' : 'auto',
           transform: widget.iconConfig.position === 'background' ? 'translate(-50%, -50%)' : 'none',
           opacity: widget.iconConfig.position === 'background' ? 0.2 : widget.iconConfig.opacity,
           zIndex: 0,
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center'
        }}>
           <IconCmp size={widget.iconConfig.position === 'background' ? widget.iconConfig.size * 2 : widget.iconConfig.size} color={finalIcon} />
        </div>
      )}
      
      {widget.contentLayout.direction !== 'icon-only' && (
        <div style={{
          fontFamily: widget.textConfig.fontFamily || 'inherit',
          fontSize: widget.textConfig.fontSize,
          fontWeight: widget.textConfig.fontWeight,
          fontStyle: widget.textConfig.fontStyle,
          color: finalText,
          textAlign: widget.textConfig.hAlign,
          lineHeight: widget.textConfig.lineHeight,
          letterSpacing: widget.textConfig.letterSpacing,
          textTransform: widget.textConfig.uppercase ? 'uppercase' : 'none',
          whiteSpace: widget.textConfig.multiline ? 'pre-wrap' : 'nowrap',
          zIndex: 1
        }}>
          {currentLabel}
        </div>
      )}
      
      {/* Interaction State Overlay for busy/disabled if not fully handled by statesStyle */}
      {currentStateKey === 'busy' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}
    </div>
  );
};
