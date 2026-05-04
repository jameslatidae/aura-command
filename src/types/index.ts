export type UUID = string;

export interface AURATheme {
  id: string;
  name: string;
  canvasBg: string; // solid color
  canvasBg2?: string; // used for gradient
  panelBg: string;
  panelBg2: string;
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  disabled: string;
  radius: number;
  shadow: string;
  fontFamily: string;
  baseFontSize: number;
}

export type BackgroundType = 'solid' | 'gradient';

export interface PageConfig {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundColor2?: string;
  gridEnabled: boolean;
  gridSize: number;
  snapToGrid: boolean;
  themeId: string;
}

export interface Geometry {
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
}

export interface TextConfig {
  fontFamily?: string; // inherits if undef
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'lighter' | 'bolder' | number;
  fontStyle: 'normal' | 'italic';
  textColor?: string;
  hAlign: 'left' | 'center' | 'right';
  vAlign: 'top' | 'middle' | 'bottom';
  lineHeight: number;
  letterSpacing: number;
  uppercase: boolean;
  multiline: boolean;
}

export interface IconConfig {
  enabled: boolean;
  name: string;
  color?: string;
  size: number;
  opacity: number;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'background';
  spacing: number;
  alignment: 'left' | 'center' | 'right'; // secondary alignment
}

export interface ContentLayoutConfig {
  direction: 'vertical' | 'horizontal' | 'text-only' | 'icon-only';
  hAlign: 'left' | 'center' | 'right' | 'space-between';
  vAlign: 'top' | 'middle' | 'bottom';
  padding: [number, number, number, number]; // top, right, bottom, left
  gap: number;
}

export interface ShapeStyle {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  shadowEnabled: boolean;
  shadowIntensity: number;
  opacity: number;
  glassEffect: boolean;
}

export interface StateStyleOverride {
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  borderColor?: string;
  opacity?: number;
}

export interface ButtonStatesConfig {
  normal: StateStyleOverride;
  pressed: StateStyleOverride;
  busy: StateStyleOverride;
  success: StateStyleOverride;
  error: StateStyleOverride;
  disabled: StateStyleOverride;
}

export interface InteractionConfig {
  mode: 'momentary' | 'toggle';
  debounceMs: number;
  pressAnimation: boolean;
  disabled: boolean;
}

export type ActionProtocol = 'none' | 'http' | 'tcp-simulated';
export type HttpMethod = 'GET' | 'POST' | 'PUT';
export type PayloadFormat = 'text' | 'hex' | 'json';
export type ExpectedReplyMatchType = 'contains' | 'equals' | 'regex' | 'containsHex';

export interface ActionConfig {
  enabled: boolean;
  protocol: ActionProtocol;
  trigger: 'onPress';
  // HTTP
  httpMethod: HttpMethod;
  url: string;
  httpBody: string; // Used for POST/PUT
  // TCP
  tcpHost: string;
  tcpPort: number;
  payloadFormat: PayloadFormat;
  payload: string;
  // Shared
  expectReply: boolean;
  expectedReplyMatchType: ExpectedReplyMatchType;
  expectedReplyValue: string;
  timeoutMs: number;
  // Mock testing
  mockReply: string; // for tcp-simulated mock reply
  // Responses
  onSuccessState: 'normal' | 'success' | 'none';
  onSuccessLabelOverride?: string;
  onFailState: 'normal' | 'error' | 'none';
  onFailLabelOverride?: string;
}

export interface ButtonWidget {
  id: string;
  type: 'button';
  name: string;
  label: string;
  visible: boolean;
  enabled: boolean;
  
  geometry: Geometry;
  textConfig: TextConfig;
  iconConfig: IconConfig;
  contentLayout: ContentLayoutConfig;
  shapeStyle: ShapeStyle;
  statesStyle: ButtonStatesConfig;
  interaction: InteractionConfig;
  action: ActionConfig;
  
  // Runtime ephemeral state, typically not exported
  runtimeState?: {
    state: 'normal' | 'pressed' | 'busy' | 'success' | 'error' | 'active' | 'disabled';
    labelOverride?: string | null;
  };
}

export type Widget = ButtonWidget; // extend union in future

export interface AURAProject {
  schemaVersion: string;
  app: string;
  project: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  themeId: string;
  page: PageConfig;
  widgets: Widget[];
}

export interface SerializedProject extends AURAProject {}
