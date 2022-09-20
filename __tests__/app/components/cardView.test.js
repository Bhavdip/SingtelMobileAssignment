import React from 'react';
import { shallow } from 'enzyme';
import CardView from '../../../app/components/cardview';

const setUpComponent = (props = {}) => {
  return shallow(<CardView {...props} />);
};

describe('Test CardView Component', () => {
  let wrapperComponent = {};
  let props = {};
  beforeEach(() => {
    wrapperComponent = setUpComponent(props);
  });
  it('Test Snapshot Match', () => {
    expect(wrapperComponent).toMatchSnapshot();
  });
});

