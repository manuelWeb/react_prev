import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Login from './login';
import { CustomerInfoModel } from '../../models/createUpdateCustomerModel';

Enzyme.configure({ adapter: new Adapter() })

function setupReadOnly() {
    const props = {
        loginData: {} as CustomerInfoModel
    };

    const enzymeWrapper = shallow(<Login {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

function setupChange() {
    const props = {
        handleChange: jest.fn(),
        loginData: {} as CustomerInfoModel
    };

    const enzymeWrapper = shallow(<Login {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('Components Login', () => {
    describe('Login in read-only', () => {
        it('should render self with labels', () => {
            const { enzymeWrapper } = setupReadOnly();
            expect(enzymeWrapper.find('input').length).toEqual(0);
            expect(enzymeWrapper.find('input[type="text"]').length).toBe(0);
            expect(enzymeWrapper.find('label').length).toBe(4);
        });
    });

    describe('Login in update', () => {
        it('should render self with input text', () => {
            const { enzymeWrapper } = setupChange();
            expect(enzymeWrapper.find('input').length).toEqual(2);
            expect(enzymeWrapper.find('label').length).toEqual(2);
            expect(enzymeWrapper.find('input[type="email"]').length).toBe(1);
            expect(enzymeWrapper.find('input[type="password"]').length).toBe(1);
        });

        it('should call HandleChange if length of one text is changed', () => {
            const { enzymeWrapper, props } = setupChange();
            const input = enzymeWrapper.find('input[id="emailAdress"]').at(0);
            expect(props.handleChange.mock.calls.length).toBe(0)
            input.simulate('change', { target: { value: 'titi@titi.fr' } });
            expect(props.handleChange.mock.calls.length).toBe(1)
        })
    });
});