import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import CustomerPersoData from './customerPersoData';
import { CustomerInfoModel } from '../../models/createUpdateCustomerModel';

Enzyme.configure({ adapter: new Adapter() })

function setupReadOnly() {
    const props = {
        persoData: {} as CustomerInfoModel
    };

    const enzymeWrapper = shallow(<CustomerPersoData {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

function setupChange() {
    const props = {
        handleChange: jest.fn(),
        persoData: {} as CustomerInfoModel
    };

    const enzymeWrapper = shallow(<CustomerPersoData {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('Components CustomerPersoData', () => {
    describe('CustomerPersoData in read-only', () => {
        it('should render self with labels', () => {
            const { enzymeWrapper } = setupReadOnly();
            expect(enzymeWrapper.find('input').length).toEqual(0);
            expect(enzymeWrapper.find('input[type="text"]').length).toBe(0);
            expect(enzymeWrapper.find('label').length).toBe(6);
        });
    });

    describe('CustomerPersoData in update', () => {
        it('should render self with input text', () => {
            const { enzymeWrapper } = setupChange();
            expect(enzymeWrapper.find('input').length).toEqual(4);
            expect(enzymeWrapper.find('label').length).toEqual(5);
            expect(enzymeWrapper.find('input[type="radio"]').length).toBe(2);
            expect(enzymeWrapper.find('input[type="text"]').length).toBe(2);
        });

        it('should call HandleChange if length of one text is changed', () => {
            const { enzymeWrapper, props } = setupChange();
            const input = enzymeWrapper.find('input[id="civiliteMonsieur"]').at(0);
            expect(props.handleChange.mock.calls.length).toBe(0)
            input.simulate('change', { target: { value: 'MR' } });
            expect(props.handleChange.mock.calls.length).toBe(1)
        })
    });
});