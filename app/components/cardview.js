import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scale } from '@helper';
import { Colors } from '@theme/colors';
import { getCardMeasure } from '@helper/utilites';
import { AppConstants } from '@constants';
import CardFlip from './cardflip';

const CardView = props => {
  // Creating a ref object using useRef hook
  const cardFlip = useRef(null);
  return (
    <CardFlip
      ref={cardFlip}
      flipZoom={AppConstants.FLIP_ZOOM}
      duration={AppConstants.FLIP_ANIM_DURATION}
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
    height: getCardMeasure().CONTAINER_HEIGHT
  },
  flipCardStyle: {
    borderWidth: scale(4),
    borderRadius: scale(12),
    height: getCardMeasure().CARD_HEIGHT,
    width: getCardMeasure().CARD_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.Shades.COLOR_WHITE
  },
  frontCardStyle: {
    backgroundColor: Colors.FRONT_SIDE_COLOR
  },
  backCardStyle: {
    backgroundColor: Colors.BACK_SIDE_COLOR
  }
});
export default CardView;
