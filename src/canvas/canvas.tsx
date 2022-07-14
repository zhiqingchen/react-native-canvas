import React, {useRef, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet} from 'react-native';

import {MakeCanvas, HTMLCanvas} from '../htmlcanvas/htmlcanvas';
import {CanvasRenderingContext2D} from '../htmlcanvas/canvas2dcontext';
import {BlendMode, SkiaView, useDrawCallback, SkPaint} from '@shopify/react-native-skia';

interface RNCanvasProps {
  width?: number;
  height?: number;
  style?: any;
}

const Canvas = forwardRef((props: RNCanvasProps, ref) => {
  const domRef = useRef(null);
  const _style = Object.assign({}, props.style, {width: props.width, height: props.height});

  let skcanvas: HTMLCanvas;
  let paint: SkPaint;
  let ctx: CanvasRenderingContext2D;

  useImperativeHandle(ref, () => ({
    getContext: (type: string = '2d'): CanvasRenderingContext2D | undefined => {
      if (type === '2d') {
        return ctx;
      } else {
        console.log('not support ' + type);
      }
    },
    width: _style.width,
    height: _style.height,
  }));

  const onDraw = useDrawCallback(canvas => {
    skcanvas = MakeCanvas(canvas) as HTMLCanvas;
    ctx = skcanvas.getContext('2d') as CanvasRenderingContext2D;

    paint = ctx._paint;
    paint.setAntiAlias(true);
    paint.setBlendMode(BlendMode.Multiply);

    // this is work
    ctx.fillStyle = '#ff0';
    ctx.fillRect(0, 0, 100, 200);
    ctx.strokeStyle = '#0000ff';
    ctx.strokeRect(20, 20, 50, 100);
    ctx.font = '30px Arial';
    var txt = 'Hello World';
    ctx.fillStyle = '#f0f';
    ctx.fillText('width:' + ctx.measureText(txt).width, 10, 100);
    ctx.fillText(txt, 10, 150);
  });

  return (
    <View ref={domRef} style={_style}>
      <SkiaView style={styles.skiaView} onDraw={onDraw} />
    </View>
  );
});

const styles = StyleSheet.create({
  skiaView: {
    flex: 1,
  },
});

export default Canvas;
