import React, {useRef} from 'react';
import {Image, StyleSheet, Animated, ImageSourcePropType} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

interface Props {
  id: string;
  imageSrc: ImageSourcePropType;
  position: {x: number; y: number};

  onDrag?: ({x, y, id}: {x: number; y: number; id: string}) => void;
  onDragStart?: () => void;

  onDragEnd?: ({x, y, id}: {x: number; y: number; id: string}) => void;
}

const DraggableItem = ({
  id,
  imageSrc,
  onDrag,
  position,
  onDragStart,
  onDragEnd,
}: Props) => {
  const translateX = useRef<Animated.Value>(new Animated.Value(position.x || 0))
    .current;
  const translateY = useRef<Animated.Value>(new Animated.Value(position.y || 0))
    .current;
  const lastOffset = useRef({x: position.x || 0, y: position.y || 0}).current;

  const _onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const _onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastOffset.x += event.nativeEvent.translationX;
      lastOffset.y += event.nativeEvent.translationY;
      translateX.setOffset(lastOffset.x);
      translateX.setValue(0);
      translateY.setOffset(lastOffset.y);
      translateY.setValue(0);

      if (onDrag) onDrag({x: lastOffset.x, y: lastOffset.y, id});
    } else if (event.nativeEvent.oldState === State.UNDETERMINED) {
      translateX.extractOffset();
      translateY.extractOffset();
    } else if (event.nativeEvent.oldState === State.BEGAN && onDragStart) {
      onDragStart();
    } else if (event.nativeEvent.oldState === State.END && onDragEnd) {
      onDragEnd({x: lastOffset.x, y: lastOffset.y, id});
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={_onGestureEvent}
      onHandlerStateChange={_onHandlerStateChange}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            transform: [{translateX}, {translateY}],
          },
        ]}>
        <Image style={styles.part} source={imageSrc} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  part: {
    margin: 4,
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
});

export default DraggableItem;
