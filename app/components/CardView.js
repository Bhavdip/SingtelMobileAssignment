import React, { useRef } from 'react';
import { Pressable, Animated, StyleSheet, View, Text, Dimensions } from 'react-native';

const window = Dimensions.get('window');
const CARD_WIDTH = window.width * 0.3;
const CARD_ASPECT_RATIO = (302 / 207) * 0.45;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;
// const CARD_HEIGHT = 40;

const CardView = props => {
  let flipRotation = 0;
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const zoom = useRef(new Animated.Value(0)).current;

  flipAnimation.addListener(({ value }) => {
    flipRotation = value;
  });

  const frontOpacity = flipAnimation.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0]
  });

  const backOpacity = flipAnimation.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1]
  });

  // Handle cardPopup
  const cardZoom = zoom.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 1 + 0.09],
    extrapolate: 'clamp'
  });

  const scaling = {
    transform: [{ scale: cardZoom }]
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg']
        })
      }
    ]
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg']
        })
      }
    ]
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      tension: 10,
      friction: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      tension: 10,
      friction: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={styles.cardWrapper}>
      <Pressable onPress={() => (flipRotation >= 90 ? flipToBack() : flipToFront())}>
        <Animated.View style={[styles.flipCardStyle, styles.frontCardStyle, frontAnimatedStyle,{ elevation: 10 }, { opacity: frontOpacity}]}>
          {<Text style={{ fontSize: 42, color: 'white' }}>{'\u003F'}</Text>}
        </Animated.View>
        <Animated.View style={[styles.flipCardStyle, styles.backCardStyle, backAnimatedStyle, { elevation: 100 }, { opacity: backOpacity}]}>
          <Text>{`card2: ${props.cardNumber}`}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    margin: 6
  },
  flipCardStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderRadius: 12,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderColor: 'white'
  },
  frontCardStyle: {
    position: 'absolute',
    backgroundColor: '#1DA1F3'
  },
  backCardStyle: {
    backfaceVisibility: 'hidden',
    backgroundColor: 'white'
  }
});
export default CardView;
