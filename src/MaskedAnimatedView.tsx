import React, { useEffect, useRef, useCallback } from 'react';
import { View, Animated } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import {
  loadingAnimation,
  loadedAnimation,
  getAnimatedTransformStyle,
  getAnimatedColorStyle,
  resetLoadedAnimation,
} from './MaskedAnimatedView.animations';
import type { MaskedAnimatedViewProps } from './MaskedAnimatedView.types';
import { MAVAnimationState } from './MaskedAnimatedView.constants';
import { styles } from './MaskedAnimatedView.styles';

export const MaskedAnimatedView: React.FC<MaskedAnimatedViewProps> = ({
  children = null,
  animationState = MAVAnimationState.LOADING,
  maskItem: maskItemProp = null,
  backgroundColor: backgroundColorProp = 'black',
  maskColor: maskColorProp = 'white',
  maskElementStyle: maskElementStyleProp = { height: 80, width: 80 },
}) => {
  const scaleAnimBackground = useRef(new Animated.Value(1.1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const loadingAnimationInstance = loadingAnimation(scaleAnim);

  const startLoadingAnimation = useCallback(() => {
    Animated.sequence([
      resetLoadedAnimation(scaleAnim, colorAnim, scaleAnimBackground),
      loadingAnimationInstance,
    ]).start();
  }, [loadingAnimationInstance, scaleAnim, colorAnim, scaleAnimBackground]);

  const startLoadedAnimation = useCallback(() => {
    loadingAnimationInstance.stop();
    loadedAnimation(scaleAnimBackground, scaleAnim, colorAnim).start();
  }, [loadingAnimationInstance, scaleAnimBackground, scaleAnim, colorAnim]);

  useEffect(() => {
    if (animationState === MAVAnimationState.LOADING) {
      startLoadingAnimation();
    } else if (animationState === MAVAnimationState.LOADED) {
      startLoadedAnimation();
    }
  }, [animationState, startLoadingAnimation, startLoadedAnimation]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColorProp }]}>
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <Animated.View
            style={[
              styles.maskElementContainer,
              getAnimatedColorStyle(colorAnim),
            ]}
          >
            <Animated.View
              style={[
                maskElementStyleProp,
                getAnimatedTransformStyle(scaleAnim),
              ]}
            >
              {maskItemProp}
            </Animated.View>
          </Animated.View>
        }
      >
        <Animated.View
          style={[
            styles.backgroundContainer,
            getAnimatedTransformStyle(scaleAnimBackground),
            { backgroundColor: maskColorProp },
          ]}
        >
          {children}
        </Animated.View>
      </MaskedView>
    </View>
  );
};

export default MaskedAnimatedView;
