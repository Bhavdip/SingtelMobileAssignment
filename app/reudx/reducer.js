import createReducer from '../helper/createReducer';

const initialState = {
  counter: 0,
  shuffledData: [],
};

export const appReducer = createReducer(initialState, {});
