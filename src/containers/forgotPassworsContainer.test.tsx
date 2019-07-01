import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ForgotPasswordContainer from './forgotPasswordContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('ForgotPasswordContainer component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ForgotPasswordContainer />);
    expect(wrapper).toBeDefined();
  });
});