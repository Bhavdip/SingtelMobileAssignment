import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CardGamePage from '../../../../app/feature/card-game/index';

const mockStore = configureMockStore();
const globalStore = mockStore({});

const setUpComponent = (store, props = {}) => {
  return shallow(<CardGamePage store={store} {...props} />).find('CampaignsListScreen').dive();
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
