import { Dimensions } from 'react-native';
import { scale } from '@helper';
import { AppConstants } from '@constants';

export function getCardMeasure() {
  const { height, width } = Dimensions.get('window');
  const CARD_WIDTH = (width - scale(20)) / AppConstants.GAMEPAD_COLUMNS;
  const CARD_HEIGHT =
    (height / ((AppConstants.CARD_PAIRS_VALUE * 2) / AppConstants.GAMEPAD_COLUMNS)) *
    AppConstants.HEIGHT_FACTOR;

  return {
    CARD_WIDTH,
    CARD_HEIGHT
  };
}
