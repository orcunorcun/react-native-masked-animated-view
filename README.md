# react-native-masked-animated-view

A React Native component for creating masked animations.

<img src="https://github.com/orcunorcun/react-native-masked-animated-view/assets/23243922/01f4bc60-8548-49ca-ad55-5f7bc5ba6b2d" width="300" />

## Installation

To install the package, use npm or yarn:

```sh
npm install react-native-masked-animated-view @react-native-masked-view/masked-view
```

or

```sh
yarn add react-native-masked-animated-view @react-native-masked-view/masked-view
```

### Additional Setup for iOS

If you're using this library in an iOS project, make sure to navigate to the `ios` directory and run `pod install` to install the necessary CocoaPods dependencies:

```sh
cd ios
pod install
```

## Usage

Here's a basic example of how to use `MaskedAnimatedView` in your React Native project.

```javascript
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

const maskItem = require('./path/to/your/maskItem.png');

const App = () => {
  const [animationState, setAnimationState] = useState(
    MAVAnimationState.LOADED,
  );

  const renderMaskItem = () => (
    <View style={styles.maskItemContainer}>
      <Text style={styles.enterText}>ENTER</Text>
      <Image source={maskItem} style={styles.maskItemImage} />
    </View>
  );

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
      <Pressable style={styles.button} onPress={handlePress}>
        <MaskedAnimatedView
          animationState={animationState}
          backgroundColor="green"
          maskItem={renderMaskItem()}
          maskElementStyle={{}}>
          <View style={styles.innerView} />
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
  innerView: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
```

For more detailed example, please refer to the [example directory](/example) in the repository.

## Props

| Prop Name            | Type     | Default         | Description                                                                                   |
|----------------------|----------|-----------------|-----------------------------------------------------------------------------------------------|
| `children`           | node     | `null`          | The content to be masked by the animated view.                                                |
| `animationState`     | enum     | `MAVAnimationState.LOADING` | The state of the animation. Can be `MAVAnimationState.LOADING` or `MAVAnimationState.LOADED`. |
| `maskItem`           | ReactNode | `null`          | The item to be used as the mask (e.g., an image or a custom component).                       |
| `backgroundColor`    | string   | `black`         | The background color of the view.                                                             |
| `maskColor`          | string   | `white`         | The color of the mask element's background.                                                   |
| `maskElementStyle`   | object   | `{ height: 80, width: 80 }` | The style of the mask element.                                                      |

## Animation States

The `animationState` prop controls the state of the animation. It can have the following values:

- `LOADING`: The animation is in the loading state.
- `LOADED`: The animation is in the loaded state.

## Development

If you want to contribute or run the example project, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/orcunorcun/react-native-masked-animated-view.git
cd react-native-masked-animated-view
```

2. Install dependencies:

```sh
npm install
cd example
npm install
```

3. Run the example project:

```sh
npm start
```

## License

MIT
