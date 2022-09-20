import React from 'react';
import { shallow } from 'enzyme';
import SingtelApplication from '../../app/SingtelApplication';

const setUpComponent = (props = {}) => {
  return shallow(<SingtelApplication {...props} />);
};

describe('Test SingtelApplication', () => {
  let wrapperComponent = {};
  let props = {};
  beforeEach(()=> {
    wrapperComponent = setUpComponent(props);
  });
  it('Test Snapshot Match', ()=> {
    expect(wrapperComponent).toMatchSnapshot();
  });
});
