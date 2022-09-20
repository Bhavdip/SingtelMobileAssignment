import { all } from 'redux-saga/effects';
import { appSagas } from '../feature/sagas';

export default function* rootSaga() {
  yield all([...appSagas]);
}
