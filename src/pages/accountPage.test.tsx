import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerInfos from '../containers/customerContainer';
import AccountPage from './accountPage';


Enzyme.configure({ adapter: new Adapter() });
describe('LoginPage component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<AccountPage />);
        expect(wrapper).toBeDefined();
    });

    it('renders a CustomerInfos component', () => {
        const wrapper = shallow(<AccountPage />);
        expect(wrapper.find(CustomerInfos)).toBeDefined();
    });
});