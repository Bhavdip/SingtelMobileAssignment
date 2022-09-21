import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CardGame from '../../../../app/feature/card-game/index';
import { defaultAppReducer } from '../../../../__mocks__/reducers/appreducer';
import { findComponentByID } from '../../../../__mocks__/mockutil';
import HeaderSection from '../../../../app/components/header-section';
import { FlatList } from 'react-native';
import CardFlip from '../../../../app/components/cardflip';


// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
//   useRef: jest.fn()
// }));

const mockStore = configureMockStore();
const globalStore = mockStore({
  ...defaultAppReducer
});

const setUpComponent = (store, props = {}) => {
  return shallow(<CardGame store={store} {...props} />).find('CardGame').dive();
};

describe('Test Card Game', () => {
  let wrapperComponent = {};
  let props = {
    isGameOver: false,
    restartGame: jest.fn()
  };
  beforeEach(()=> {
    const setFlipPressed = jest.fn()
    jest.spyOn(React, 'useState').mockImplementation(isFlipPress => [isFlipPress=true, setFlipPressed]);

    wrapperComponent = setUpComponent(globalStore, props);
  });
  it('Test Snapshot Match', ()=> {
    expect(wrapperComponent).toMatchSnapshot();
  });

  it('Test press on restart should restart the game', () =>{
    const HeaderSectionComp = findComponentByID(wrapperComponent, HeaderSection, 'HeaderSectionComp');
    console.log(HeaderSectionComp.debug());
    HeaderSectionComp.props().onRestartPress();
  });

  it('Test renderGameCads onPressCard function', () => {
    wrapperComponent.setProps({ shuffledData: [5,6,7,8,9,8,9,7,5,6]});
    console.log(wrapperComponent.debug());
    const CardsList = findComponentByID(wrapperComponent, FlatList, 'CardsList');
    const CardView = shallow(CardsList.props().renderItem({ item: 45, index: 10 }));
    console.log(CardView.debug());
    const CardFlipComp = findComponentByID(CardView, CardFlip, 'CardFlipComp');
    console.log(CardFlipComp.debug());
    CardFlipComp.props().onFlipEnd(0);
  });

  it('Test renderGameCads onPressCard function', () => {
    const cardData = {
      cardId: 40,
      cardNumber: 100
    };
    wrapperComponent.instance().handleClick(cardData);
  });

  it('Test Game is over should render popup', () => {
    wrapperComponent.setProps({ isGameOver: true });
    console.log(wrapperComponent.debug());
  });

});
