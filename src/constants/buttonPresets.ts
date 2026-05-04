import { ButtonWidget } from '../types';

export interface ButtonPreset {
  id: string;
  name: string;
  applyFlags: {
    colors: boolean;
    shape: boolean;
    layout: boolean;
  };
  modifier: (widget: ButtonWidget) => ButtonWidget;
}

export const BUTTON_PRESETS: ButtonPreset[] = [
  {
    id: 'dark_rounded',
    name: 'Dark Rounded',
    applyFlags: { colors: true, shape: true, layout: true },
    modifier: (w) => ({
      ...w,
      shapeStyle: {
        ...w.shapeStyle,
        backgroundColor: '#1E293B',
        borderColor: '#334155',
        borderWidth: 2,
        borderRadius: 24,
        shadowEnabled: true,
        glassEffect: false
      },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#1E293B', textColor: '#F8FAFC', iconColor: '#94A3B8' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#334155', textColor: '#FFFFFF', iconColor: '#FFFFFF' },
        success: { ...w.statesStyle.success, backgroundColor: '#10B981', textColor: '#FFFFFF', iconColor: '#FFFFFF' },
        error: { ...w.statesStyle.error, backgroundColor: '#EF4444', textColor: '#FFFFFF', iconColor: '#FFFFFF' }
      }
    })
  },
  {
    id: 'dark_glass',
    name: 'Dark Glass',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: {
        ...w.shapeStyle,
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderRadius: 16,
        shadowEnabled: true,
        glassEffect: true
      },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: 'rgba(30, 41, 59, 0.4)', textColor: '#F8FAFC' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
      }
    })
  },
  {
    id: 'red_command',
    name: 'Red Command',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#7f1d1d', borderColor: '#ef4444', borderWidth: 2, borderRadius: 8 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#7f1d1d', textColor: '#fca5a5' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#ef4444', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'green_status',
    name: 'Green Status',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#14532d', borderColor: '#22c55e', borderWidth: 2, borderRadius: 8 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#14532d', textColor: '#86efac' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#22c55e', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'amber_warning',
    name: 'Amber Warning',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#78350f', borderColor: '#f59e0b', borderWidth: 2, borderRadius: 8 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#78350f', textColor: '#fcd34d' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#f59e0b', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'blue_broadcast',
    name: 'Blue Broadcast',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#1e3a8a', borderColor: '#3b82f6', borderWidth: 2, borderRadius: 12 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#1e3a8a', textColor: '#bfdbfe' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#3b82f6', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'grey_utility',
    name: 'Grey Utility',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#3f3f46', borderColor: '#71717a', borderWidth: 1, borderRadius: 4 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#3f3f46', textColor: '#e4e4e7' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#52525b', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'white_minimal',
    name: 'White Minimal',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderWidth: 1, borderRadius: 8, shadowEnabled: true },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#ffffff', textColor: '#18181b', iconColor: '#3f3f46' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#f4f4f5', textColor: '#000000', iconColor: '#000000' }
      }
    })
  },
  {
    id: 'neon_outline',
    name: 'Neon Outline',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: 'transparent', borderColor: '#0ea5e9', borderWidth: 2, borderRadius: 4 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: 'transparent', textColor: '#0ea5e9', iconColor: '#0ea5e9' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#0ea5e9', textColor: '#0f172a', iconColor: '#0f172a' }
      }
    })
  },
  {
    id: 'rack_control',
    name: 'Rack Control',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#262626', borderColor: '#404040', borderWidth: 2, borderRadius: 2 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#262626', textColor: '#d4d4d8' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#eab308', textColor: '#171717' }
      }
    })
  },
  {
    id: 'scene_preset',
    name: 'Scene Preset',
    applyFlags: { colors: true, shape: true, layout: true },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#312e81', borderColor: '#4f46e5', borderWidth: 1, borderRadius: 16 },
      contentLayout: { ...w.contentLayout, direction: 'vertical', hAlign: 'center', vAlign: 'middle' },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#312e81', textColor: '#c7d2fe' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#4f46e5', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'emergency_critical',
    name: 'Emergency Critical',
    applyFlags: { colors: true, shape: true, layout: true },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#000000', borderColor: '#ef4444', borderWidth: 4, borderRadius: 0 },
      textConfig: { ...w.textConfig, uppercase: true, fontWeight: 'bold' },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#000000', textColor: '#ef4444', iconColor: '#ef4444' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#ef4444', textColor: '#ffffff', iconColor: '#ffffff' }
      }
    })
  }
];
