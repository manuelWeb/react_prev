// import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateAccountPage from './createAccountPage';
import CreateAccountContainer from '../containers/createAccountContainer';
// import { createBrowserHistory, History } from 'history';
import { ICreateAccountProps } from '../constants/account/IAccount';
import createAccountContainer from '../containers/createAccountContainer';
import { createBrowserHistory } from 'history';


Enzyme.configure({ adapter: new Adapter() });
const createAccountProps = {} as ICreateAccountProps;


describe('CreateAccountPage component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(CreateAccountPage(createAccountProps));
        expect(wrapper).toBeDefined();
    });

    it('renders a CreateAccountContainer component', () => {
        const wrapper = shallow(CreateAccountPage(createAccountProps));
        expect(wrapper.find(CreateAccountContainer)).toBeDefined();
    });
});

describe('mock createAccountContainer', () => {
    const mockCreateAccountContainer = jest.fn();
    jest.mock('../containers/createAccountContainer', () => {
        return jest.fn().mockImplementation(() => {
            return { createAccountContainer: mockCreateAccountContainer };
        });
    });

    beforeEach(() => {
        mockCreateAccountContainer.mockClear();
    });

    it('The page should be able to call new() on CreateAccountContainer', () => {
        const createConsumer = CreateAccountPage(createAccountProps);
        expect(createConsumer).toBeTruthy();
    });

    it('Test the history props value null', () => {
        const createConsumer = shallow(CreateAccountPage(createAccountProps));
        expect((createConsumer).prop('history')).toEqual(undefined);
    });

    it('Test the createAccount props value null', () => {
        const createConsumer = shallow(CreateAccountPage(createAccountProps));
        expect((createConsumer).prop('createAccount')).toEqual(undefined);
    });

    const propsHistory = createBrowserHistory();

    // it('Test the history props value null', () => {
    //     const wrapper = shallow(CreateAccountPage({ history: propsHistory, createAccount: jest.fn() }));
    //     expect((wrapper.find(CreateAccountContainer)).prop('history')).toEqual(propsHistory);
    // });
});

