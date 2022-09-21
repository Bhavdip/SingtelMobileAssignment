import { call, put, select, delay } from 'redux-saga/effects';
import { AppConstants } from '@constants';
import {
  isGameOver,
  lockedExecution,
  recordCardData,
  reqForGenerateCards,
  resetAllSetting,
  restResolvedData,
  saveGeneratedCards,
  saveSteps,
  updateClickCount,
  updateResolvedCards
} from '../reudx/actions';
import {
  resolvedData,
  shuffledData,
  stepsCount,
  clickCount,
  isBlocked,
  prevSelectedCard,
  prevCardId
} from '../reudx/selectors';

export function getRandomIntInclusive(paramMin, paramMax) {
  // The maximum is inclusive and the minimum is inclusive
  const min = Math.ceil(paramMin);
  const max = Math.floor(paramMax);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateUniqueNumbs() {
  const result = [];
  let currentIndex = 0;
  while (currentIndex < AppConstants.CARD_PAIRS_VALUE) {
    const item = getRandomIntInclusive(1, 100);
    if (result.indexOf(item) === -1) {
      result.push(item);
      currentIndex++;
    }
  }
  return result;
}

export function shuffleParis(numberPairs) {
  let randomIndex;
  for (let currentIndex = numberPairs.length - 1; currentIndex >= 0; currentIndex--) {
    if (currentIndex > 2) {
      randomIndex = getRandomIntInclusive(0, currentIndex - 2);
      // console.log(currentIndex, randomIndex, numberPairs[currentIndex], numberPairs[randomIndex]);
      while (numberPairs[currentIndex] === numberPairs[randomIndex]) {
        // console.log(`inside while ${randomIndex}`);
        randomIndex = getRandomIntInclusive(0, currentIndex - 2);
        // console.log(`after while ${randomIndex}`);
      }
      if (numberPairs[currentIndex] !== numberPairs[randomIndex]) {
        [numberPairs[currentIndex], numberPairs[randomIndex]] = [
          numberPairs[randomIndex],
          numberPairs[currentIndex]
        ];
      }
    } else {
      // console.log(`inside else ${currentIndex}`);
      randomIndex = getRandomIntInclusive(0, currentIndex);
      // console.log(currentIndex, randomIndex, numberPairs[currentIndex], numberPairs[randomIndex]);
      if (numberPairs[currentIndex] !== numberPairs[randomIndex]) {
        [numberPairs[currentIndex], numberPairs[randomIndex]] = [
          numberPairs[randomIndex],
          numberPairs[currentIndex]
        ];
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
  console.log(`[Appsaga][generateParisOfNumbs] => Save Steps call ${resultShuffled}`);
  yield put(saveGeneratedCards(resultShuffled));
}

export function* extractState() {
  const resolvedDataSet = yield select(resolvedData);
  const shuffledDataSet = yield select(shuffledData);
  const cardClickCount = yield select(clickCount);
  const gameSteps = yield select(stepsCount);
  const isLocked = yield select(isBlocked);
  const prevSelectedNumb = yield select(prevSelectedCard);
  const prevSelectedId = yield select(prevCardId);
  return {
    resolvedDataSet,
    shuffledDataSet,
    cardClickCount,
    gameSteps,
    isLocked,
    prevSelectedNumb,
    prevSelectedId
  };
}

export function* requestForMatchCard(action) {
  try {
    const {
      resolvedDataSet,
      shuffledDataSet,
      cardClickCount,
      gameSteps,
      isLocked,
      prevSelectedNumb,
      prevSelectedId
    } = yield call(extractState);
    // save steps count in store
    yield put(saveSteps(gameSteps + 1));

    console.log(`[AppSaga][requestForMatchCard] action =>${JSON.stringify(action)}`);
    const { cardData } = action.payload;
    const { cardId } = cardData;
    const nwFlipCards = resolvedDataSet.slice();
    if (nwFlipCards[cardId] === false) {
      nwFlipCards[cardId] = !nwFlipCards[cardId];
    }
    if (cardClickCount === 1) {
      console.log(
        `[AppSaga][handleClick]<==${cardClickCount}-Click\t\t[CardId]=${cardData.cardId},[cardNumber]=${cardData.cardNumber}`
      );
      // Save Previously Card Info
      console.log(`[AppSaga][shuffledDataSet]==>${JSON.stringify(shuffledDataSet)}`);
      yield put(recordCardData(cardId, shuffledDataSet[cardId]));

      yield put(updateClickCount(2));
      console.log(`[AppSaga][A.Set Click Count ]=${cardClickCount}`);

      yield put(updateResolvedCards(nwFlipCards));
    } else if (cardClickCount === 2 && !isLocked) {
      console.log(
        `[AppSaga][handleClick]<==${cardClickCount}-Click,\t\t[CardId]=${cardData.cardId},[cardNumber]=${cardData.cardNumber}`
      );

      yield put(lockedExecution(true));
      console.log('set=>=>[Blocked]=true');

      yield put(updateResolvedCards(nwFlipCards));

      yield call(isCardMatch, prevSelectedNumb, cardData.cardNumber, prevSelectedId, cardId);
    }
  } catch (error) {
    console.log(`[AppSaga][requestForMatchCard][TryCatch]:${JSON.stringify(error)}`);
  }
}

export function* isCardMatch(card1, card2, card1Id, card2Id) {
  try {
    const { resolvedDataSet, cardClickCount } = yield call(extractState);
    console.log(
      `[AppSaga]isCardMatch:[card1]:${card1},[card2]=${card2},\t[card1Id]:${card1Id},[card2Id]=${card2Id}`
    );
    if (card1 === card2) {
      const reviledCards = resolvedDataSet.slice();
      reviledCards[card1Id] = true;
      reviledCards[card2Id] = true;
      console.log(`[AppSaga][CardGame]: Matched\n${JSON.stringify(reviledCards)}`);

      yield put(updateResolvedCards(reviledCards));

      yield put(updateClickCount(1));
      console.log(`[AppSaga][B.Set Click Count ]=${cardClickCount}`);

      yield put(lockedExecution(false));
      console.log('set=>=>[Blocked]=false');
    } else {
      const flipBack = resolvedDataSet.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      console.log(`[AppSaga][CardGame]: Not Matched\n${JSON.stringify(flipBack)}`);

      yield put(updateResolvedCards(flipBack));

      yield put(updateClickCount(1));
      console.log(`[AppSaga][B.Set Click Count ]=${cardClickCount}`);

      yield put(lockedExecution(false));
      console.log('set=>=>[Blocked]=false');
    }
    // check game is over or not
    yield call(isGameFinished, resolvedDataSet);
  } catch (error) {
    console.log(`[AppSaga][isCardMatch][TryCatch]:${JSON.stringify(error)}`);
  }
}

export function* isGameFinished(resolvedDataSet) {
  if (resolvedDataSet && resolvedDataSet.length > 0) {
    const result = resolvedDataSet.every(element => element !== false);
    if (result) {
      yield put(isGameOver(true));
    } else {
      yield put(isGameOver(false));
    }
  }
}

export function* restartGame() {
  console.log('[AppSaga][restartGame]');
  yield put(restResolvedData());
  yield delay(1000);
  yield put(resetAllSetting());
  yield put(reqForGenerateCards());
}
