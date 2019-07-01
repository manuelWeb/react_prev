import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import AddressData from './addressData';

Enzyme.configure({ adapter: new Adapter() })

function setupReadOnly() {
    const props = {
        address: {
            PostalCode: '',
            Location: '',
            City: '',
            LabelTrack: '',
            TypeShortTrack: '',
            TypeTrack: '',
            TrackNumeroSupplement: '',
            TrackNumber: '',
            AdditionalAdress: ''
        }
    };

    const enzymeWrapper = shallow(<AddressData {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

function setupChange() {
    const props = {
        handleChange: jest.fn(),
        address: {
            PostalCode: '',
            Location: '',
            City: '',
            LabelTrack: '',
            TypeShortTrack: '',
            TypeTrack: '',
            TrackNumeroSupplement: '',
            TrackNumber: '',
            AdditionalAdress: ''
        }
    };

    const enzymeWrapper = shallow(<AddressData {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('Components AddressData', () => {
    describe('AddressData in read-only', () => {
        it('should render self with labels', () => {
            const { enzymeWrapper } = setupReadOnly();
            expect(enzymeWrapper.find('input').length).toEqual(0);
            expect(enzymeWrapper.find('input[type="text"]').length).toBe(0);
        });
    });

    describe('AddressData in update', () => {
        it('should render self with input text', () => {
            const { enzymeWrapper } = setupChange();
            expect(enzymeWrapper.find('input').length).toEqual(6);
            expect(enzymeWrapper.find('input[type="text"]').length).toBe(4);
            expect(enzymeWrapper.find('input[type="tel"]').length).toBe(2);
        });

        it('should call HandleChange if length of one text is changed', () => {
            const { enzymeWrapper, props } = setupChange();
            const input = enzymeWrapper.find('input[id="numeroVoie"]').first();
            input.simulate('change');
            expect(props.handleChange.mock.calls.length).toBe(1)
        })
    });
});