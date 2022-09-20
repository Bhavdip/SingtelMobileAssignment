import { RESET_STEPS, SAVE_STEPS } from './types';

export function saveSteps(value) {
  return {
    type: SAVE_STEPS,
    payload: {
      value
    }
  };
}

export function resetSteps() {
  return {
    type: RESET_STEPS,
    payload: {}
  };
}
