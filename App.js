/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef} from 'react';
import {SafeAreaView, Button, StyleSheet} from 'react-native';

import Canvas from './src/canvas/canvas';
// import Canvas2 from './src/canvas/canvas2';
// import Canvas3 from './src/canvas/canvas3';

const App = () => {
  const myCanvasRef = useRef({});

  // this is error
  const drawCanvas = () => {
    const ctx = myCanvasRef.current.getContext();
    if (ctx !== undefined) {
      ctx.fillStyle = '#ff0';
      ctx.fillRect(0, 0, 100, 200);
      ctx.strokeStyle = '#0000ff';
      ctx.strokeRect(20, 20, 50, 100);
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'black';
      ctx.fillStyle = 'red';
      ctx.fillRect(90, 20, 50, 100);
      ctx.shadowBlur = 0;
    }
  };

  // this is error
  const clearCanvas = () => {
    const ctx = myCanvasRef.current.getContext();
    ctx.clearRect(0, 0, myCanvasRef.current.width, myCanvasRef.current.height);
    myCanvasRef.current.paint();
  };

  return (
    <SafeAreaView>
      <Canvas style={styles.canvas} ref={myCanvasRef} width={300} height={300} />
      <Button onPress={() => drawCanvas()} title="Click" />
      <Button onPress={() => clearCanvas()} title="Clear" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  canvas: {
    height: 200,
    width: 400,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
  },
});

export default App;

