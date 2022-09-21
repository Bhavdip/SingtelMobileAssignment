import { AppConstants } from '@constants';

const defaultAppReducer = {
  appReducer: {
    stepsCount: 0,
    shuffledData: [],
    resolvedData: Array(AppConstants.CARD_PAIRS_VALUE * 2).fill(false),
    clickCount: 1,
    isBlocked: false,
    prevSelectedCard: -1,
    prevCardId: -1,
    isGameOver: false
  }
};
export { defaultAppReducer };
