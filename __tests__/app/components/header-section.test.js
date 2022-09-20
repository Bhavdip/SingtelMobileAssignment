import React from 'react';
import { shallow } from 'enzyme';
import HeaderSection from '../../../app/components/header-section';

const setUpComponent = (props = {}) => {
  return shallow(<HeaderSection {...props} />);
};

describe('Test HeaderSection', () => {
  let wrapperComponent = {};
  let props = {};
  beforeEach(()=> {
    wrapperComponent = setUpComponent(props);
  });
  it('Test Snapshot Match', ()=> {
    expect(wrapperComponent).toMatchSnapshot();
  });
});
