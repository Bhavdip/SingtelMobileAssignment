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

const appReducerWithMockData = {
  appReducer: {
    stepsCount: 32,
    shuffledData: [34, 37, 66, 90, 71, 66, 34, 19, 90, 71, 37, 19],
    resolvedData: [true, true, false, false, false, false, true, false, false, false, true, false],
    clickCount: 1,
    isBlocked: false,
    prevSelectedCard: 34,
    prevCardId: 6,
    isGameOver: false
  }
};

export { defaultAppReducer, appReducerWithMockData };
