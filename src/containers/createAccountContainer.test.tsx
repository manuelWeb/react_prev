 import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateAccountContainer from '../containers/createAccountContainer';
import { ICreateAccountProps } from '../constants/account/IAccount';


Enzyme.configure({ adapter: new Adapter() });
const createAccountProps = {} as ICreateAccountProps;

describe('CreateAccountPage component', () => {
    const wrapper = shallow(<CreateAccountContainer {...createAccountProps} />)
    it('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

    it('renders form component', () => {
        expect(wrapper.find('form')).toBeDefined();
    });

});

// describe('mock createAccountContainer', () => {
//     const mockCreateAccountContainer = jest.fn();
//     jest.mock('../containers/createAccountContainer', () => {
//         return jest.fn().mockImplementation(() => {
//             return { createAccountContainer: mockCreateAccountContainer };
//         });
//     });

//     beforeEach(() => {
//         mockCreateAccountContainer.mockClear();
//     });

//     it('The page should be able to call new() on CreateAccountContainer', () => {
//         const createConsumer = CreateAccountPage(createAccountProps);
//         expect(createConsumer).toBeTruthy();
//     });

//     it('Test the history props value null', () => {
//         const createConsumer = shallow(CreateAccountPage(createAccountProps));
//         expect((createConsumer).prop('history')).toEqual(undefined);
//     });

//     it('Test the createAccount props value null', () => {
//         const createConsumer = shallow(CreateAccountPage(createAccountProps));
//         expect((createConsumer).prop('createAccount')).toEqual(undefined);
//     });

//     const propsHistory = createBrowserHistory();

//     it('Test the history props value null', () => {
//         const wrapper = shallow(CreateAccountPage({ history: propsHistory, createAccount: jest.fn() }));
//         expect((wrapper.find(CreateAccountContainer)).prop('history')).toEqual(propsHistory);
//     });
// });

