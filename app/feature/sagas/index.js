import { takeLatest } from 'redux-saga/effects';
import * as types from '../reudx/types';
import { teaLiveSaveForLater } from './appsaga';

export const appSagas = [takeLatest(types.SAVE_STEPS, teaLiveSaveForLater)];
