import createReducer from '@helper/createReducer';
import { RESET_STEPS, SAVE_GENERATED_CARDS, SAVE_STEPS } from './types';

const initialState = {
  stepsCount: 0,
  shuffledData: []
};

export const appReducer = createReducer(initialState, {
  [SAVE_STEPS](state, action) {
    return {
      ...state,
      stepsCount: action.payload.value
    };
  },
  [RESET_STEPS](state) {
    return {
      ...state,
      stepsCount: 0
    };
  },
  [SAVE_GENERATED_CARDS](state, action) {
    return {
      ...state,
      shuffledData: [...action.payload.shuffledData]
    };
  }
});
