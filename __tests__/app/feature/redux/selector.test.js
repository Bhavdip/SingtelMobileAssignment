import {
  resolvedData,
  shuffledData,
  clickCount,
  isBlocked,
  stepsCount,
  prevSelectedCard,
  prevCardId
} from '../../../../app/feature/reudx/selectors';
import { mockShuffledData, mockResolvedData } from '../../../../__mocks__/mockdata';

const state = {
  appReducer: {
    stepsCount: 0,
    shuffledData: mockShuffledData,
    resolvedData: mockResolvedData,
    clickCount: 1,
    isBlocked: false,
    prevSelectedCard: -1,
    prevCardId: -1,
    isGameOver: false
  }
};

describe('Testing Reducer of Store -> Redux', () => {
  test('testing selector token', () => {
    expect(shuffledData(state)).toEqual(mockShuffledData);
  });
  test('testing Resolved Data', () => {
    expect(resolvedData(state)).toEqual(mockResolvedData);
  });
  test('testing Click Count', () => {
    expect(clickCount(state)).toEqual(1);
  });
  test('testing isBlocked', () => {
    expect(isBlocked(state)).toEqual(false);
  });
  test('testing Steps Count', () => {
    expect(stepsCount(state)).toEqual(0);
  });
  test('testing Steps Count', () => {
    expect(stepsCount(state)).toEqual(0);
  });
  test('testing Previous selected State', () => {
    expect(prevSelectedCard(state)).toEqual(-1);
  });
  test('testing Previous selected State', () => {
    expect(prevCardId(state)).toEqual(-1);
  });
});
