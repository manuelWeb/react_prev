import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './../pages/homePage';
import HomeContainer from './../containers/homeContainer'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });

describe('Home component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(HomePage());
        expect(wrapper).toBeDefined();
    });

    it('renders a HomeContainer component', () => {
        const wrapper = shallow(HomePage());
        expect(wrapper.find(HomeContainer)).toBeDefined();
    });
});