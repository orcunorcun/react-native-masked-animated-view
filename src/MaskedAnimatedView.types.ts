import type { ReactNode } from 'react';
import type { ImageStyle } from 'react-native';

export type AnimationState = 'LOADING' | 'LOADED';

export interface IMAVAnimationState {
  LOADING: AnimationState;
  LOADED: AnimationState;
}

export interface MaskedAnimatedViewProps {
  children?: ReactNode;
  animationState?: AnimationState;
  maskItem?: any;
  backgroundColor?: string;
  maskColor?: string;
  maskElementStyle?: ImageStyle;
}
