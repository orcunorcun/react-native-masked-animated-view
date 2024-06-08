import { Animated, Easing } from 'react-native';

export const loadingAnimation = (scaleAnim: Animated.Value) => {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ])
  );
};

export const loadedAnimation = (
  scaleAnimBackground: Animated.Value,
  scaleAnim: Animated.Value,
  colorAnim: Animated.Value
) => {
  return Animated.parallel([
    Animated.timing(scaleAnimBackground, {
      toValue: 1,
      duration: 700,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 50,
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }),
    Animated.timing(colorAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }),
  ]);
};

export const resetLoadedAnimation = (
  scaleAnim: Animated.Value,
  colorAnim: Animated.Value,
  scaleAnimBackground: Animated.Value
) => {
  scaleAnimBackground.setValue(1);
  scaleAnim.setValue(2);
  colorAnim.setValue(0.5);

  return Animated.parallel([
    Animated.timing(scaleAnimBackground, {
      toValue: 1.1,
      duration: 700,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }),
    Animated.timing(colorAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }),
  ]);
};

export const getAnimatedTransformStyle = (scaleAnim: Animated.Value) => {
  return {
    transform: [{ scale: scaleAnim }],
  };
};

export const getAnimatedColorStyle = (colorAnim: Animated.Value) => {
  return {
    backgroundColor: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', '#ffffff'],
    }),
  };
};
