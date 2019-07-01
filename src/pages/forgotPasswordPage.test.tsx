import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ForgotPasswordPage from './forgotPasswordPage';
import ForgotPasswordContainer from '../containers/forgotPasswordContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('ForgotPasswordPage component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ForgotPasswordPage />);
    expect(wrapper).toBeDefined();
  });

  it('should contain a <ForgotPasswordContainer /> component', () => {
    const wrapper = shallow(<ForgotPasswordPage />);
    expect(wrapper.contains(<ForgotPasswordContainer />)).toBe(true);
  });
});