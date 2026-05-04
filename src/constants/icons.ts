import React from 'react';
import {
  Power,
  Play,
  Square, // for stop
  Volume2,
  VolumeX,
  Lightbulb,
  Video, // projector approx
  Monitor, // screen
  Grid, // matrix
  Camera,
  Settings,
  AlertTriangle, // warning
  Check,
  X,
  Network,
  Speaker
} from 'lucide-react';

export const ICON_MAP: Record<string, React.ElementType> = {
  power: Power,
  play: Play,
  stop: Square,
  volume: Volume2,
  mute: VolumeX,
  light: Lightbulb,
  projector: Video,
  screen: Monitor,
  matrix: Grid,
  camera: Camera,
  settings: Settings,
  warning: AlertTriangle,
  check: Check,
  x: X,
  network: Network,
  speaker: Speaker
};
