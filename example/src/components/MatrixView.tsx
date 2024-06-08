import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView, Dimensions} from 'react-native';

const generateRandomCharacter = (): string => {
  const charType = Math.floor(Math.random() * 3);
  switch (charType) {
    case 0:
      return String.fromCharCode(
        Math.floor(Math.random() * (0x005a - 0x0041 + 1)) + 0x0041,
      ); // Latin uppercase characters A-Z
    case 1:
      return String.fromCharCode(
        Math.floor(Math.random() * (0x0039 - 0x0030 + 1)) + 0x0030,
      ); // Numbers 0-9
    case 2:
      return String.fromCharCode(
        Math.floor(Math.random() * (0x30ff - 0x30a0 + 1)) + 0x30a0,
      ); // Katakana
    default:
      return ' ';
  }
};

const generateRandomStyle = (fontSize: number): object => {
  const opacity = Math.random() > 0.4 ? 0.2 : 1;
  return {
    color: 'green',
    fontSize,
    fontFamily: 'monospace',
    opacity,
  };
};

interface MatrixViewProps {}

const MatrixView: React.FC<MatrixViewProps> = () => {
  const [matrixCharacters, setMatrixCharacters] = useState<
    {char: string; style: object}[][]
  >([]);

  const {height: screenHeight} = Dimensions.get('window');
  const numColumns = 20;
  const numRows = 35;
  const characterHeight = screenHeight / numRows;

  useEffect(() => {
    const data = Array.from({length: numColumns}).map(() =>
      Array.from({length: numRows}).map(() => ({
        char: generateRandomCharacter(),
        style: generateRandomStyle(characterHeight),
      })),
    );
    setMatrixCharacters(data);
  }, [characterHeight]);

  return (
    <SafeAreaView style={styles.container}>
      {matrixCharacters.map((column, columnIndex) => (
        <View key={columnIndex} style={styles.column}>
          {column.map((item, rowIndex) => (
            <Text key={rowIndex} style={item.style}>
              {item.char}
            </Text>
          ))}
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 2,
  },
});

export default MatrixView;
