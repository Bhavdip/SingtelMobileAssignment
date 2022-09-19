import { Dimensions } from 'react-native';
import { AppConstants } from '@constants';
import { Spacing } from '@theme';
import { scale } from './scaling';

export function getCardMeasure() {
  const { height, width } = Dimensions.get('window');
  const CARD_WIDTH = (width - scale(20)) / AppConstants.GAMEPAD_COLUMNS;
  const CARD_HEIGHT =
    (height / ((AppConstants.CARD_PAIRS_VALUE * 2) / AppConstants.GAMEPAD_COLUMNS)) *
    AppConstants.HEIGHT_FACTOR;
  const CONTAINER_HEIGHT = CARD_HEIGHT + Spacing.x8;
  return {
    CARD_WIDTH,
    CARD_HEIGHT,
    CONTAINER_HEIGHT
  };
}
