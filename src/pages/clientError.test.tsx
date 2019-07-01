import React from 'react';
import { shallow } from 'enzyme';
import ClientError from './../pages/clientError';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });

describe('Button component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<ClientError />);
        expect(wrapper).toBeDefined();
    });

    it('renders a paragraphe', () => {
        const wrapper = shallow(<ClientError />);
        expect(wrapper.find(HTMLParagraphElement)).toBeDefined();
    });
});