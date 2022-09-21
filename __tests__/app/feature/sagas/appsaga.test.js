import { select, call, put } from 'redux-saga/effects';
import {
  extractState,
  generateParisOfNumbs,
  isCardMatch,
  requestForMatchCard
} from '../../../../app/feature/sagas/appsaga';
import { saveGeneratedCards, saveSteps, updateResolvedCards } from '../../../../app/feature/reudx/actions';
import { AppConstants } from '../../../../app/constants';
import { appReducerWithMockData } from '../../../../__mocks__/reducers/appreducer'

describe('Test Card Match Game App Saga', () => {
  it('Test function for Generate unique numbers from 1 to 100', () => {
    const generator = generateParisOfNumbs();
    let next = generator.next();
    const shuffledData = next.value.payload.action.payload.shuffledData
    expect(next.value).toEqual(put(saveGeneratedCards(shuffledData)));
    // number should not grater than 100
    const result = shuffledData.every(element => element > 100)
    expect(result).toBeFalsy();
    // length of the array should be 2 * CARD_PAIRS_VALUE
    expect(shuffledData.length).toEqual(AppConstants.CARD_PAIRS_VALUE * 2);
  });
  it('Test extractState function', () => {
    const mockAppReducer = appReducerWithMockData.appReducer;
    const generator = extractState();
    let next = generator.next();
    next = generator.next(mockAppReducer.resolvedData);
    next = generator.next(mockAppReducer.shuffledData);
    next = generator.next(mockAppReducer.clickCount);
    next = generator.next(mockAppReducer.stepsCount);
    next = generator.next(mockAppReducer.isBlocked);
    next = generator.next(mockAppReducer.prevSelectedCard);
    next = generator.next(mockAppReducer.prevCardId);
    console.log(next.value);
    expect(next.value.gameSteps).toEqual(mockAppReducer.stepsCount);
    expect(next.value.isLocked).toEqual(mockAppReducer.isBlocked);
    expect(next.value.cardClickCount).toEqual(mockAppReducer.clickCount);
  });

  it('Test requestForMatchCard function when press first card', () => {
    const action = {
      payload: {
        cardData: {
          cardId: 7,
          cardNumber: 19
        }
      }
    }
    const generator = requestForMatchCard(action);
    const mockAppReducer = appReducerWithMockData.appReducer;
    let next = generator.next();
    next = generator.next({ resolvedDataSet: mockAppReducer.resolvedData, shuffledDataSet: mockAppReducer.shuffledData, cardClickCount: mockAppReducer.clickCount,  gameSteps: mockAppReducer.stepsCount, isLocked: mockAppReducer.isBlocked, prevSelectedNumb: mockAppReducer.prevSelectedCard, prevSelectedId: mockAppReducer.prevCardId});
    expect(next.value).toEqual(put(saveSteps(mockAppReducer.stepsCount + 1)));
    next = generator.next();
    next = generator.next();
    next = generator.next();

    const nwFlipCards = mockAppReducer.resolvedData.slice();
    if (nwFlipCards[action.payload.cardData.cardId] === false) {
      nwFlipCards[action.payload.cardData.cardId] = !nwFlipCards[action.payload.cardData.cardId];
    }
    expect(next.value).toEqual(put(updateResolvedCards(nwFlipCards)));
    next = generator.next();
    expect(next.done).toEqual(true);
  });
  it('Test requestForMatchCard function when press second card', () => {
    const action = {
      payload: {
        cardData: {
          cardId: 8,
          cardNumber: 90
        }
      }
    }
    const generator = requestForMatchCard(action);
    const mockAppReducer = appReducerWithMockData.appReducer;
    let next = generator.next();
    next = generator.next({ resolvedDataSet: mockAppReducer.resolvedData, shuffledDataSet: mockAppReducer.shuffledData, cardClickCount: mockAppReducer.clickCount + 1,  gameSteps: mockAppReducer.stepsCount, isLocked: mockAppReducer.isBlocked, prevSelectedNumb: mockAppReducer.prevSelectedCard, prevSelectedId: mockAppReducer.prevCardId});
    next = generator.next();
    next = generator.next();
    next = generator.next();
    expect(next.value).toEqual(call(isCardMatch, mockAppReducer.prevSelectedCard, action.payload.cardData.cardNumber, mockAppReducer.prevCardId, action.payload.cardData.cardId));
    next = generator.next();
    expect(next.done).toEqual(true);
  });
});
