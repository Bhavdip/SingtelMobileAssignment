import React from 'react';
import { shallow } from 'enzyme';
import HeaderSection from '../../../app/components/header-section';
import { findComponentByID } from '../../../__mocks__/mockutil';
import { TouchableOpacity } from 'react-native';

const setUpComponent = (props = {}) => {
  return shallow(<HeaderSection {...props} />);
};

describe('Test HeaderSection', () => {
  let wrapperComponent = {};
  let props = {
    onRestartPress: jest.fn()
  };
  beforeEach(()=> {
    wrapperComponent = setUpComponent(props);
  });
  it('Test Snapshot Match', ()=> {
    expect(wrapperComponent).toMatchSnapshot();
  });

  it('Test Restart Game function', () => {
    // find RestartGame CTA
    const RestartGame = findComponentByID(wrapperComponent, TouchableOpacity, 'RestartGame');
    console.log(RestartGame.debug());
    RestartGame.props().onPress();
  });

});
