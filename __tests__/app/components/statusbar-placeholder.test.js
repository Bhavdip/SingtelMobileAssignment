import React from 'react';
import { shallow } from 'enzyme';
import StatusBarPlaceHolder from '../../../app/components/statusbar-placeholder';

const setUpComponent = (props = {}) => {
  return shallow(<StatusBarPlaceHolder {...props} />);
};

describe('Test StatusBarPlaceHolder', () => {
  let wrapperComponent = {};
  let props = {};
  beforeEach(()=> {
    wrapperComponent = setUpComponent(props);
  });
  it('Test Snapshot Match', ()=> {
    expect(wrapperComponent).toMatchSnapshot();
  });
});
