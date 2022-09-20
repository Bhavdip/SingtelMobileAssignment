import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scale } from '@helper';
import PropTypes from 'prop-types';
import { Colors } from '@theme/colors';
import { getCardMeasure } from '@helper/utilites';
import { AppConstants } from '@constants';
import CardFlip from './cardflip';

const CardView = props => {
  // Creating a ref object using useRef hook
  const cardFlip = useRef(null);
  const [frontDisplay, setFrontDisplay] = useState(true);
  const [isFlipPress, setFlipPressed] = useState(false);

  useEffect(() => {
    /**
     * frontDisplay false means card back is reviled.
     * isResolved false means card should not reviled front should display
     *
     */
    if (!frontDisplay && !props.isResolved) {
      console.log(
        `useEffect:[CardId]:${props.cardId}, [frontDisplay]=${frontDisplay},[isResolved]=${props.isResolved},[cardNumber]=${props.cardNumber}`
      );
      cardFlip.current.flip();
      setFlipPressed(false);
    }
  }, [props.isResolved]);

  const onCardPress = () => {
    if (props.onPressCard && !props.isResolved && !props.isBlocked) {
      cardFlip.current.flip();
      setFlipPressed(true);
    }
  };

  const onCardFlipEnd = side => {
    console.log(
      `onCardFlipEnd:[CardId]:${props.cardId}, [side]=${side},[frontDisplay]=${frontDisplay},[isResolved]=${props.isResolved},[cardNumber]=${props.cardNumber}`
    );
    if (side === 0) {
      setFrontDisplay(true);
    } else {
      setFrontDisplay(false);
    }
    if (isFlipPress) {
      props.onPressCard({ cardId: props.cardId, cardNumber: props.cardNumber });
    }
  };

  return (
    <CardFlip
      ref={cardFlip}
      flipZoom={AppConstants.FLIP_ZOOM}
      duration={AppConstants.FLIP_ANIM_DURATION}
      flipDirection="y"
      onFlipEnd={onCardFlipEnd}
      style={styles.cardFlipContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.flipCardStyle, styles.frontCardStyle]}
        onPress={onCardPress}>
        <Text style={styles.questionTextStyle}>{'\u003F'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.flipCardStyle, styles.backCardStyle]}
        onPress={onCardPress}>
        <Text style={styles.cardNumberTextStyle}>{`${props.cardNumber}`}</Text>
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
  },
  questionTextStyle: {
    fontSize: 42,
    color: Colors.Shades.COLOR_WHITE
  },
  cardNumberTextStyle: {
    fontSize: 22
  }
});

CardView.propTypes = {
  cardId: PropTypes.number,
  isResolved: PropTypes.bool,
  cardNumber: PropTypes.number,
  onPressCard: PropTypes.func,
  isBlocked: PropTypes.bool
};

export default CardView;
