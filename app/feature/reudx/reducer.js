import createReducer from '@helper/createReducer';
import { AppConstants } from '@constants';
import {
  CHECK_GAME_IS_OVER,
  LOCKED_EXECUTION,
  RECORD_CARD_INFO,
  RESET_ALL,
  RESET_RESOLVED_CARDS,
  SAVE_GENERATED_CARDS,
  SAVE_STEPS,
  UPDATE_CLICK_COUNT,
  UPDATE_RESOLVED_CARD
} from './types';

const initialState = {
  stepsCount: 0,
  shuffledData: [],
  resolvedData: Array(AppConstants.CARD_PAIRS_VALUE * 2).fill(false),
  clickCount: 1,
  isBlocked: false,
  prevSelectedCard: -1,
  prevCardId: -1,
  isGameOver: false
};

export const appReducer = createReducer(initialState, {
  [SAVE_STEPS](state, action) {
    return {
      ...state,
      stepsCount: action.payload.value
    };
  },
  [SAVE_GENERATED_CARDS](state, action) {
    return {
      ...state,
      shuffledData: [...action.payload.shuffledData]
    };
  },
  [RECORD_CARD_INFO](state, action) {
    return {
      ...state,
      prevCardId: action.payload.cardId,
      prevSelectedCard: action.payload.cardNumber
    };
  },
  [UPDATE_RESOLVED_CARD](state, action) {
    return {
      ...state,
      resolvedData: action.payload.resolvedData
    };
  },
  [UPDATE_CLICK_COUNT](state, action) {
    return {
      ...state,
      clickCount: action.payload.clickCount
    };
  },
  [LOCKED_EXECUTION](state, action) {
    return {
      ...state,
      isBlocked: action.payload.locked
    };
  },
  [CHECK_GAME_IS_OVER](state, action) {
    return {
      ...state,
      isGameOver: action.payload.value
    };
  },
  [RESET_RESOLVED_CARDS](state) {
    return {
      ...state,
      resolvedData: Array(AppConstants.CARD_PAIRS_VALUE * 2).fill(false)
    };
  },
  [RESET_ALL](state) {
    return {
      ...state,
      stepsCount: 0,
      shuffledData: [],
      clickCount: 1,
      isBlocked: false,
      prevSelectedCard: -1,
      prevCardId: -1
    };
  }
});
