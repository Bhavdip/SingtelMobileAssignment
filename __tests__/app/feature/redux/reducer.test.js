import { appReducer } from '../../../../app/feature/reudx/reducer';
import { defaultAppReducer } from '../../../../__mocks__/reducers/appreducer'
import {
  saveSteps,
  restartGame,
  reqForGenerateCards,
  saveGeneratedCards,
  sendDataToMatch,
  recordCardData,
  updateResolvedCards,
  updateClickCount,
  lockedExecution,
  isGameOver,
  restResolvedData,
  resetAllSetting
} from '../../../../app/feature/reudx/actions';
import { mockResolvedData } from '../../../../__mocks__/mockdata';
const initialMockState = defaultAppReducer.appReducer;

describe('Test App Reducer', () => {
  let mockShuffledData;
    beforeEach(() => {
      mockShuffledData = mockResolvedData
  });

  it('test saveSteps action', ()=> {
    const action = saveSteps(1);
    const expectedState = {
      ...initialMockState,
      stepsCount: 1
    };
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
  it('test restartGame action', ()=> {
    const action = restartGame();
    const expectedState = {
      ...initialMockState
    };
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
  it('test reqForGenerateCards action', ()=> {
    const action = reqForGenerateCards();
    const expectedState = {
      ...initialMockState
    };
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
  it('test saveGeneratedCards action', ()=> {
    const action = saveGeneratedCards(mockShuffledData);
    const expectedState = {
      ...initialMockState,
      shuffledData: action.payload.shuffledData
    };
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
  it('test sendDataToMatch action', ()=> {
    const cardData = {};
    const action = sendDataToMatch(cardData);
    const expectedState = {
      ...initialMockState
    };
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
  it('test sendDataToMatch action', ()=> {
    const cardData = {
      payload: {
        cardId: 12,
        cardNumber: 79
      }
    };
    const action = recordCardData(cardData);
    const expectedState = {
      ...initialMockState,
      prevCardId: action.payload.cardId,
      prevSelectedCard: action.payload.cardNumber
    };
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });

  it('test updateResolvedCards action', ()=> {
    const resolvedData = {
      cardId: 12,
      cardNumber: 79
    };
    const action = updateResolvedCards(resolvedData);
    const expectedState = {
      ...initialMockState,
      resolvedData: action.payload.resolvedData
    };
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });

  it('test updateClickCount action', ()=> {
    const clickCount = 1;
    const action = updateClickCount(clickCount);
    const expectedState = {
      ...initialMockState,
      clickCount: action.payload.clickCount
    };
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
  it('test lockedExecution action', ()=> {
    const locked = false;
    const action = lockedExecution(locked);
    const expectedState = {
      ...initialMockState,
      isBlocked: action.payload.locked
    }
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
  it('test lockedExecution action', ()=> {
    const locked = false;
    const action = lockedExecution(locked);
    const expectedState = {
      ...initialMockState,
      isBlocked: action.payload.locked
    }
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
  it('test restResolvedData action', ()=> {
    const action = restResolvedData();
    const expectedState = {
      ...initialMockState
    }
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
  it('test isGameOver action', ()=> {
    const locked = false;
    const action = isGameOver(locked);
    const expectedState = {
      ...initialMockState,
      isGameOver: action.payload.value
    }
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
  it('test resetAllSetting action', ()=> {
    const locked = false;
    const action = resetAllSetting(locked);
    const expectedState = {
      ...initialMockState
    }
    expect(appReducer(initialMockState, action)).toEqual(expectedState);
  });
});
