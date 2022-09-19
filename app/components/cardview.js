import React, { useRef } from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import CardFlip from './cardflip';

const window = Dimensions.get('window');
const CARD_WIDTH = window.width * 0.3;
const CARD_ASPECT_RATIO = (302 / 207) * 0.45;
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;
// const CARD_HEIGHT = 40;

const CardView = props => {
  // Creating a ref object using useRef hook
  const cardFlip = useRef(null);
  return (
    <CardFlip
      ref={cardFlip}
      flipZoom={0.09}
      duration={600}
      flipDirection="y"
      style={styles.cardFlipContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.flipCardStyle, styles.frontCardStyle]}
        onPress={() => cardFlip.current.flip()}>
        <Text style={{ fontSize: 42, color: 'white' }}>{'\u003F'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.flipCardStyle, styles.backCardStyle]}
        onPress={() => cardFlip.current.flip()}>
        <Text style={styles.label}>{`Back Side:${props.cardNumber}`}</Text>
      </TouchableOpacity>
    </CardFlip>
  );
};

const styles = StyleSheet.create({
  cardFlipContainer: {
    flex: 1,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    margin: 8
  },
  flipCardStyle: {
    borderWidth: 5,
    borderRadius: 12,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  frontCardStyle: {
    backgroundColor: '#1DA1F3'
  },
  backCardStyle: {
    backgroundColor: 'white'
  }
});
export default CardView;
