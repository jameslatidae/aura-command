import { AURAProject, ButtonWidget } from '../types';
import { generateUUID } from '../lib/utils';
import { THEMES } from './themes';

export const createDefaultButton = (x: number = 100, y: number = 100): ButtonWidget => {
  return {
    id: 'btn_' + generateUUID(),
    type: 'button',
    name: 'New Button',
    label: 'Button',
    visible: true,
    enabled: true,
    
    geometry: { x, y, w: 160, h: 60, rotation: 0 },
    
    textConfig: {
      fontSize: 16,
      fontWeight: 'bold',
      fontStyle: 'normal',
      hAlign: 'center',
      vAlign: 'middle',
      lineHeight: 1.2,
      letterSpacing: 0,
      uppercase: false,
      multiline: false
    },
    
    iconConfig: {
      enabled: false,
      name: 'power',
      size: 24,
      opacity: 1,
      position: 'left',
      spacing: 8,
      alignment: 'center'
    },
    
    contentLayout: {
      direction: 'horizontal',
      hAlign: 'center',
      vAlign: 'middle',
      padding: [8, 8, 8, 8],
      gap: 8
    },
    
    shapeStyle: {
      backgroundColor: '#1E293B',
      borderColor: '#334155',
      borderWidth: 2,
      borderRadius: 8,
      shadowEnabled: true,
      shadowIntensity: 0.5,
      opacity: 1,
      glassEffect: false
    },
    
    statesStyle: {
      normal: { backgroundColor: '#1E293B', textColor: '#F8FAFC', iconColor: '#94A3B8' },
      pressed: { backgroundColor: '#334155', textColor: '#FFFFFF', iconColor: '#FFFFFF' },
      busy: { backgroundColor: '#334155', opacity: 0.8 },
      success: { backgroundColor: '#10B981', textColor: '#FFFFFF' },
      error: { backgroundColor: '#EF4444', textColor: '#FFFFFF' },
      disabled: { opacity: 0.5 }
    },
    
    interaction: {
      mode: 'momentary',
      debounceMs: 50,
      pressAnimation: true,
      disabled: false
    },
    
    action: {
      enabled: false,
      protocol: 'none',
      trigger: 'onPress',
      httpMethod: 'POST',
      url: 'http://192.168.1.100/api',
      httpBody: '{}',
      tcpHost: '192.168.1.100',
      tcpPort: 9000,
      payloadFormat: 'text',
      payload: 'HELLO',
      expectReply: false,
      expectedReplyMatchType: 'contains',
      expectedReplyValue: 'OK',
      timeoutMs: 2000,
      mockReply: 'OK',
      onSuccessState: 'success',
      onFailState: 'error'
    }
  };
};

export const createDefaultProject = (): AURAProject => {
  const defaultTheme = THEMES.find(t => t.id === 'broadcast_dark') || THEMES[0];
  
  const exampleBtn = createDefaultButton(100, 100);
  exampleBtn.name = 'Projector Power';
  exampleBtn.label = 'Projector';
  exampleBtn.iconConfig.enabled = true;
  exampleBtn.iconConfig.name = 'power';
  // preset dark glass
  exampleBtn.shapeStyle.backgroundColor = 'rgba(30, 41, 59, 0.4)';
  exampleBtn.shapeStyle.glassEffect = true;
  
  exampleBtn.action = {
    ...exampleBtn.action,
    enabled: true,
    protocol: 'tcp-simulated',
    payloadFormat: 'hex',
    payload: '00 FF',
    expectReply: true,
    expectedReplyMatchType: 'equals',
    expectedReplyValue: 'AA 01',
    mockReply: 'AA 01',
    onSuccessState: 'success',
    onSuccessLabelOverride: 'ON',
    onFailState: 'error',
    onFailLabelOverride: 'ERROR'
  };

  return {
    schemaVersion: '1.0.0',
    app: 'AURA Command',
    project: {
      id: 'project_' + generateUUID(),
      name: 'AURA Command Test Panel',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    themeId: 'broadcast_dark',
    page: {
      id: 'page_main',
      name: 'Main Control',
      width: 1280,
      height: 800,
      backgroundType: 'gradient',
      backgroundColor: '#10131a',
      backgroundColor2: '#1a1f29',
      gridEnabled: true,
      gridSize: 20,
      snapToGrid: true,
      gridOpacity: 0.25,
      themeId: 'broadcast_dark'
    },
    widgets: [exampleBtn]
  };
};
