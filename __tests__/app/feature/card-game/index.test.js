import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CardGame from '../../../../app/feature/card-game/index';
import { defaultAppReducer } from '../../../../__mocks__/reducers/appreducer';

const mockStore = configureMockStore();
const globalStore = mockStore({
  ...defaultAppReducer
});
const _navigator = { dispatch: jest.fn() };

const setUpComponent = (store, props = {}) => {
  return shallow(<CardGame store={store} {...props} />).find('CardGame').dive();
};



describe('Test Card Game', () => {
  let wrapperComponent = {};
  let props = {};
  beforeEach(()=> {
    wrapperComponent = setUpComponent(globalStore, props);
  });
  it('Test Snapshot Match', ()=> {
    expect(wrapperComponent).toMatchSnapshot();
  });
});
