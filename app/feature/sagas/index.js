import { takeLatest } from 'redux-saga/effects';
import * as types from '../reudx/types';
import { generateParisOfNumbs } from './appsaga';

export const appSagas = [takeLatest(types.REQ_GENERATE_CARDS, generateParisOfNumbs)];
