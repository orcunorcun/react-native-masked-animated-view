import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import {
  MaskedAnimatedView,
  MAVAnimationState,
} from 'react-native-masked-animated-view';
import MatrixView from './components/MatrixView';

const maskItem = require('./assets/code.png');

const App: React.FC = () => {
  const [animationState, setAnimationState] = useState<
    (typeof MAVAnimationState)[keyof typeof MAVAnimationState]
  >(MAVAnimationState.LOADED);

  const renderMaskItem = () => {
    return (
      <View style={styles.maskItemContainer}>
        <Text style={styles.enterText}>ENTER</Text>
        <Image source={maskItem} style={styles.maskItemImage} />
      </View>
    );
  };

  const handlePress = () => {
    setAnimationState(
      animationState === MAVAnimationState.LOADING
        ? MAVAnimationState.LOADED
        : MAVAnimationState.LOADING,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Pressable style={styles.button} onPress={() => handlePress()}>
        <MaskedAnimatedView
          animationState={animationState}
          backgroundColor="green"
          maskItem={renderMaskItem()}
          maskElementStyle={{}}>
          <MatrixView />
        </MaskedAnimatedView>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
  },
  maskItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  maskItemImage: {
    width: 150,
    height: 150,
  },
});

export default App;
