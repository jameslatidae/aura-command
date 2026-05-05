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
  },
  {
    id: 'soft_slate',
    name: 'Soft Slate',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#334155', borderColor: '#475569', borderWidth: 1, borderRadius: 8, shadowEnabled: true },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#334155', textColor: '#f8fafc' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#475569', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'frosted_blue',
    name: 'Frosted Blue',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.4)', borderWidth: 1, borderRadius: 12, glassEffect: true },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: 'rgba(59, 130, 246, 0.2)', textColor: '#bfdbfe' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: 'rgba(59, 130, 246, 0.4)', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'carbon_tile',
    name: 'Carbon Tile',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#18181b', borderColor: '#27272a', borderWidth: 2, borderRadius: 4, shadowEnabled: true },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#18181b', textColor: '#a1a1aa' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#27272a', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'industrial_panel',
    name: 'Industrial Panel',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#262626', borderColor: '#525252', borderWidth: 3, borderRadius: 0 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#262626', textColor: '#d4d4d8' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#404040', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'executive_touch',
    name: 'Executive Touch',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#1f2937', borderColor: '#4b5563', borderWidth: 1, borderRadius: 6, shadowEnabled: true },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#1f2937', textColor: '#e5e7eb' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#374151', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'matrix_lime',
    name: 'Matrix Lime',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#000000', borderColor: '#15803d', borderWidth: 1, borderRadius: 0 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#000000', textColor: '#22c55e', iconColor: '#22c55e' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#14532d', textColor: '#4ade80', iconColor: '#4ade80' }
      }
    })
  },
  {
    id: 'purple_pulse',
    name: 'Purple Pulse',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#4c1d95', borderColor: '#7c3aed', borderWidth: 2, borderRadius: 16 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#4c1d95', textColor: '#e9d5ff' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#6d28d9', textColor: '#ffffff' }
      }
    })
  },
  {
    id: 'cyan_glow',
    name: 'Cyan Glow',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: 'transparent', borderColor: '#06b6d4', borderWidth: 2, borderRadius: 8 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: 'transparent', textColor: '#22d3ee', iconColor: '#22d3ee' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#0891b2', textColor: '#ffffff', iconColor: '#ffffff' }
      }
    })
  },
  {
    id: 'clean_flat',
    name: 'Clean Flat',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#e2e8f0', borderColor: '#cbd5e1', borderWidth: 0, borderRadius: 4, shadowEnabled: false },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#e2e8f0', textColor: '#0f172a', iconColor: '#0f172a' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#cbd5e1', textColor: '#000000', iconColor: '#000000' }
      }
    })
  },
  {
    id: 'pill_accent',
    name: 'Pill Accent',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#4f46e5', borderColor: '#6366f1', borderWidth: 0, borderRadius: 9999, shadowEnabled: true },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#4f46e5', textColor: '#ffffff', iconColor: '#ffffff' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#4338ca', textColor: '#e0e7ff', iconColor: '#e0e7ff' }
      }
    })
  },
  {
    id: 'outline_minimal',
    name: 'Outline Minimal',
    applyFlags: { colors: true, shape: true, layout: false },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: 'transparent', borderColor: '#94a3b8', borderWidth: 1, borderRadius: 6 },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: 'transparent', textColor: '#f8fafc', iconColor: '#f8fafc' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#334155', textColor: '#ffffff', iconColor: '#ffffff' }
      }
    })
  },
  {
    id: 'heavy_duty',
    name: 'Heavy Duty',
    applyFlags: { colors: true, shape: true, layout: true },
    modifier: (w) => ({
      ...w,
      shapeStyle: { ...w.shapeStyle, backgroundColor: '#b45309', borderColor: '#78350f', borderWidth: 4, borderRadius: 4, shadowEnabled: true },
      textConfig: { ...w.textConfig, fontWeight: 'bold', uppercase: true },
      statesStyle: {
        ...w.statesStyle,
        normal: { ...w.statesStyle.normal, backgroundColor: '#b45309', textColor: '#fef3c7', iconColor: '#fef3c7' },
        pressed: { ...w.statesStyle.pressed, backgroundColor: '#d97706', textColor: '#ffffff', iconColor: '#ffffff' }
      }
    })
  }
];
