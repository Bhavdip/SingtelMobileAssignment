import React, { useState, useRef } from 'react';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';
import CardView from '../../../app/components/cardview';
import { findComponentByID } from '../../../__mocks__/mockutil';
import CardFlip from '../../../app/components/cardflip';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn()
}));


const setUpComponent = (props = {}) => {
  return shallow(<CardView {...props} />);
};

const props = {
  cardId: 10,
  cardNumber: 98,
  isBlocked: false,
  isResolved: false,
  onPressCard: jest.fn(),
  onCardFlipEnd: jest.fn()
};

describe('Test CardView Component | onFlipEnd Function Invoke', () => {
  let wrapperComponent = {};
  let setFrontDisplay;
  beforeEach(() => {
    jest.resetAllMocks();
    setFrontDisplay = jest.fn();
    const fontDisplayMock = (frontDisplay) => [frontDisplay, setFrontDisplay];
    jest.spyOn(React, 'useState').mockImplementation(fontDisplayMock);
    wrapperComponent = setUpComponent(props);
  });
  it('Test Snapshot Match', () => {
    expect(wrapperComponent).toMatchSnapshot();
  });
  it('Test CardFlip onFlipEnd should invoke onCardFlipEnd and font display make it true', () => {
    const CardFlipComp = findComponentByID(wrapperComponent, CardFlip, 'CardFlipComp');
    expect(CardFlipComp.props().testID).toEqual('CardFlipComp');
    CardFlipComp.props().onFlipEnd(0);
    expect(setFrontDisplay).toHaveBeenCalledTimes(1);
    CardFlipComp.props().onFlipEnd(1);
    expect(setFrontDisplay).toHaveBeenCalledTimes(2);
  });
});

describe('Test CardView onCardPress method',() =>{
  let wrapperComponent;
  // on Flip Mock
  const mockFlip = jest.fn();
  let mUseRefCardFlip;
  beforeEach(() => {
    jest.resetAllMocks();
    // set default value as true
    const setFlipPressed = jest.fn()
    jest.spyOn(React, 'useState').mockImplementation(isFlipPress => [isFlipPress=true, setFlipPressed]);
    // Mock useReference
    const mRef = { current: { flip: mockFlip } };
    mUseRefCardFlip = jest.spyOn(React, 'useRef').mockReturnValueOnce(mRef);
    wrapperComponent = setUpComponent(props);
  })
  it('Test CardFlip onCardPress when card is not resolved and it is not blocked', () => {
    const CardFrontSide = findComponentByID(wrapperComponent, TouchableOpacity, 'FrontSide');
    expect(CardFrontSide.props().testID).toEqual('FrontSide');
    CardFrontSide.props().onPress();
    expect(mUseRefCardFlip).toHaveBeenCalled();
  });
  it('Test CardFlip onCardPress when card is either resolved or blocked', () => {
    wrapperComponent.setProps({ onPressCard: null, isResolved: true, isBlocked: true });
    const CardFrontSide = findComponentByID(wrapperComponent, TouchableOpacity, 'FrontSide');
    expect(CardFrontSide.props().testID).toEqual('FrontSide');
    CardFrontSide.props().onPress();
    expect(mUseRefCardFlip).toHaveBeenCalled();
  });
  it('Test CardFlip onCardFlipEnd function', () => {
    const CardFlipComp = findComponentByID(wrapperComponent, CardFlip, 'CardFlipComp');
    expect(CardFlipComp.props().testID).toEqual('CardFlipComp');
    CardFlipComp.props().onFlipEnd(0);
  });
})

