import {
  CHECK_GAME_IS_OVER,
  LOCKED_EXECUTION,
  RECORD_CARD_INFO,
  REQ_GENERATE_CARDS,
  RESET_ALL,
  RESET_RESOLVED_CARDS,
  RESTART_GAME,
  SAVE_GENERATED_CARDS,
  SAVE_STEPS,
  SEND_FOR_MATCH_CARD,
  UPDATE_CLICK_COUNT,
  UPDATE_RESOLVED_CARD
} from './types';

export function saveSteps(value) {
  return {
    type: SAVE_STEPS,
    payload: {
      value
    }
  };
}

export function restartGame() {
  return {
    type: RESTART_GAME,
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

export function sendDataToMatch(cardData) {
  return {
    type: SEND_FOR_MATCH_CARD,
    payload: {
      cardData
    }
  };
}

export function recordCardData(cardId, cardNumber) {
  return {
    type: RECORD_CARD_INFO,
    payload: {
      cardId,
      cardNumber
    }
  };
}

export function updateResolvedCards(resolvedData) {
  return {
    type: UPDATE_RESOLVED_CARD,
    payload: {
      resolvedData
    }
  };
}

export function updateClickCount(clickCount) {
  return {
    type: UPDATE_CLICK_COUNT,
    payload: {
      clickCount
    }
  };
}

export function lockedExecution(locked) {
  return {
    type: LOCKED_EXECUTION,
    payload: {
      locked
    }
  };
}

export function restResolvedData() {
  return {
    type: RESET_RESOLVED_CARDS
  };
}

export function isGameOver(value) {
  return {
    type: CHECK_GAME_IS_OVER,
    payload: {
      value
    }
  };
}

export function resetAllSetting() {
  return {
    type: RESET_ALL,
    payload: {}
  };
}
