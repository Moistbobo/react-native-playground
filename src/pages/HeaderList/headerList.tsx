import React, {useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

const data = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

const HEADER_SCROLL_DISTANCE = 150;

const HeaderList = () => {
  const scrollY = useRef(new Animated.Value(0)).current; // our animated value

  // our header y-axis animated from 0 to HEADER_SCROLL_DISTANCE,
  // we move our element for -HEADER_SCROLL_DISTANCE at the same time.
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE / 3],
    extrapolate: 'clamp',
  });

  // our opacity animated from 0 to 1 and our opacity will be 0
  const imageOpacity = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_SCROLL_DISTANCE / 3,
      HEADER_SCROLL_DISTANCE / 2,
      HEADER_SCROLL_DISTANCE,
    ],
    outputRange: [1, 1, 1, 1],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  // const scale = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE],
  //   outputRange: [1.0, 1.5],
  // });

  const renderItem = ({item}: any) => (
    <View style={styles.item}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <>
      <Animated.FlatList
        ListHeaderComponent={
          <Animated.View
            style={[
              styles.header,
              {
                opacity: imageOpacity,
                transform: [{translateY: headerTranslateY}],
              },
            ]}>
            <Animated.Text
              style={{
                opacity: imageOpacity,
                transform: [{translateY: imageTranslateY}],
              }}>
              Hello world
            </Animated.Text>
          </Animated.View>
        }
        stickyHeaderIndices={[0]}
        data={data}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}], // event.nativeEvent.contentOffset.x to scrollX
          // {useNativeDriver: true}, // use native driver for animation
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 1,
  },
  header: {
    backgroundColor: 'red',
    height: 150,
    textAlign: 'center',
    width: '100%',
  },
});

export default HeaderList;
