import { REQ_GENERATE_CARDS, RESET_STEPS, SAVE_GENERATED_CARDS, SAVE_STEPS } from './types';

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

export function reqForGenerateCards() {
  return {
    type: REQ_GENERATE_CARDS,
    payload: {}
  };
}

export function saveGeneratedCards(shuffledData) {
  return {
    type: SAVE_GENERATED_CARDS,
    payload: {
      shuffledData
    }
  };
}
