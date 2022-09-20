import { takeLatest, takeEvery } from 'redux-saga/effects';
import * as types from '../reudx/types';
import { generateParisOfNumbs, requestForMatchCard, restartGame } from './appsaga';

export const appSagas = [
  takeLatest(types.REQ_GENERATE_CARDS, generateParisOfNumbs),
  takeEvery(types.SEND_FOR_MATCH_CARD, requestForMatchCard),
  takeLatest(types.RESTART_GAME, restartGame)
];
