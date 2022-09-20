import { put } from 'redux-saga/effects';
import { AppConstants } from '@constants';
import { saveGeneratedCards } from '../reudx/actions';

export function getRandomIntInclusive(paramMin, paramMax) {
  // The maximum is inclusive and the minimum is inclusive
  const min = Math.ceil(paramMin);
  const max = Math.floor(paramMax);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateUniqueNumbs() {
  const array1 = [];
  let currentIndex = 0;
  while (currentIndex < AppConstants.CARD_PAIRS_VALUE) {
    const item = getRandomIntInclusive(1, 100);
    if (array1.indexOf(item) === -1) {
      array1.push(item);
      currentIndex++;
    }
  }
  return array1;
}

export function shuffleParis(numberPairs) {
  let randomIndex;
  for (let currentIndex = numberPairs.length - 1; currentIndex >= 0; currentIndex--) {
    if (currentIndex > 2) {
      randomIndex = getRandomIntInclusive(0, currentIndex - 2);
      console.log(currentIndex, randomIndex, numberPairs[currentIndex], numberPairs[randomIndex]);
      while (numberPairs[currentIndex] === numberPairs[randomIndex]) {
        console.log(`inside while ${randomIndex}`);
        randomIndex = getRandomIntInclusive(0, currentIndex - 2);
        console.log(`after while ${randomIndex}`);
      }
      if (numberPairs[currentIndex] !== numberPairs[randomIndex]) {
        [numberPairs[currentIndex], numberPairs[randomIndex]] = [numberPairs[randomIndex], numberPairs[currentIndex]];
      }
    } else {
      console.log(`inside else ${currentIndex}`);
      randomIndex = getRandomIntInclusive(0, currentIndex);
      console.log(currentIndex, randomIndex, numberPairs[currentIndex], numberPairs[randomIndex]);
      if (numberPairs[currentIndex] !== numberPairs[randomIndex]) {
        [numberPairs[currentIndex], numberPairs[randomIndex]] = [numberPairs[randomIndex], numberPairs[currentIndex]];
      }
    }
  }
  return numberPairs;
}

export function* generateParisOfNumbs() {
  const initialValue = [];
  const listOfPairs = generateUniqueNumbs().reduce((previousValue, currentValue) => {
    return previousValue.concat([currentValue, currentValue]);
  }, initialValue);
  const resultShuffled = shuffleParis(listOfPairs).slice();
  // trigger action to save it
  console.log('Sagas => Save Steps call' + resultShuffled);
  yield put(saveGeneratedCards(resultShuffled));
}
