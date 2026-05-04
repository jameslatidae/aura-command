import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AURAProject, Widget, ButtonWidget, AURATheme } from './types';
import { createDefaultProject } from './constants/defaultProject';
import { THEMES } from './constants/themes';

type StoreState = {
  project: AURAProject;
  selectedWidgetId: string | null;
  previewMode: boolean;
  logs: string[];
};

type StoreAction =
  | { type: 'LOAD_PROJECT'; payload: AURAProject }
  | { type: 'SET_WIDGET_SELECTED'; payload: string | null }
  | { type: 'UPDATE_PAGE'; payload: Partial<AURAProject['page']> }
  | { type: 'ADD_WIDGET'; payload: Widget }
  | { type: 'UPDATE_WIDGET'; payload: { id: string; updates: Partial<ButtonWidget> } }
  | { type: 'DELETE_WIDGET'; payload: string }
  | { type: 'RESET_DEFAULT' }
  | { type: 'SET_PREVIEW_MODE'; payload: boolean }
  | { type: 'ADD_LOG'; payload: string }
  | { type: 'SET_THEME'; payload: string }
  | { type: 'SET_RUNTIME_STATE'; payload: { id: string; state: any; labelOverride?: string | null } };

const defaultState: StoreState = {
  project: createDefaultProject(),
  selectedWidgetId: null,
  previewMode: false,
  logs: []
};

const reducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case 'LOAD_PROJECT':
      return { ...state, project: action.payload, selectedWidgetId: null };
    case 'SET_WIDGET_SELECTED':
      return { ...state, selectedWidgetId: action.payload };
    case 'UPDATE_PAGE':
      return { ...state, project: { ...state.project, page: { ...state.project.page, ...action.payload } } };
    case 'ADD_WIDGET':
      return { ...state, project: { ...state.project, widgets: [...state.project.widgets, action.payload] }, selectedWidgetId: action.payload.id };
    case 'UPDATE_WIDGET':
      return {
        ...state,
        project: {
          ...state.project,
          widgets: state.project.widgets.map(w =>
            w.id === action.payload.id ? { ...w, ...action.payload.updates } : w
          )
        }
      };
    case 'DELETE_WIDGET':
      return {
        ...state,
        project: {
          ...state.project,
          widgets: state.project.widgets.filter(w => w.id !== action.payload)
        },
        selectedWidgetId: state.selectedWidgetId === action.payload ? null : state.selectedWidgetId
      };
    case 'RESET_DEFAULT':
      return { ...defaultState, project: createDefaultProject() };
    case 'SET_PREVIEW_MODE':
      return { ...state, previewMode: action.payload, selectedWidgetId: null };
    case 'ADD_LOG':
      return { ...state, logs: [...state.logs.slice(-49), `[${new Date().toLocaleTimeString()}] ${action.payload}`] };
    case 'SET_THEME':
      return { ...state, project: { ...state.project, themeId: action.payload, page: { ...state.project.page, themeId: action.payload } } };
    case 'SET_RUNTIME_STATE':
      return {
        ...state,
        project: {
          ...state.project,
          widgets: state.project.widgets.map(w =>
            w.id === action.payload.id ? {
              ...w,
              runtimeState: {
                state: action.payload.state,
                labelOverride: action.payload.labelOverride !== undefined ? action.payload.labelOverride : w.runtimeState?.labelOverride
              }
            } as any : w
          )
        }
      };
    default:
      return state;
  }
};

const ProjectContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
  activeTheme: AURATheme;
} | null>(null);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState, (initial) => {
    try {
      const saved = localStorage.getItem('aura_project');
      if (saved) {
        return { ...initial, project: JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse saved project', e);
    }
    return initial;
  });

  useEffect(() => {
    if (!state.previewMode) {
      const p = { ...state.project };
      // Strip runtime state before saving
      p.widgets = p.widgets.map(w => {
        const { runtimeState, ...rest } = w;
        return rest as any;
      });
      localStorage.setItem('aura_project', JSON.stringify(p));
    }
  }, [state.project, state.previewMode]);

  const activeTheme = THEMES.find(t => t.id === state.project.themeId) || THEMES[0];

  return (
    <ProjectContext.Provider value={{ state, dispatch, activeTheme }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useStore must be inside ProjectProvider');
  return ctx;
};
