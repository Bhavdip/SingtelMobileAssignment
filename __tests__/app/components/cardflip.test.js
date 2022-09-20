import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';
import CardFlip from '../../../app/components/cardflip';

const setUpComponent = (props = {}) => {
  return shallow(<CardFlip {...props} />);
};

describe('Test CardFlip Component', () => {
  let wrapperComponent = {};
  let props = {
    duration: 800,
    flipZoom: 0.09,
    children: <View />
  };
  beforeEach(() => {
    wrapperComponent = setUpComponent(props);
  });
  it('Test Snapshot Match', () => {
    expect(wrapperComponent).toMatchSnapshot();
  });
});
