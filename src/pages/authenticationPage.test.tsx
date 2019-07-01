import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginContainer from '../containers/authenticationContainer'
import LoginPage from './authenticationPage';
import { ILoginProps } from '../constants/authentication/authenticationInterfaces';

Enzyme.configure({ adapter: new Adapter() });
const loginProps = {} as ILoginProps;
describe('LoginPage component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(LoginPage(loginProps));
        expect(wrapper).toBeDefined();
    });

    it('renders a LoginContainer component', () => {
        const wrapper = shallow(LoginPage(loginProps));
        expect(wrapper.find(LoginContainer)).toBeDefined();
    });
});

const mockLoginContainer = jest.fn();
jest.mock('../containers/authenticationContainer', () => {
    return jest.fn().mockImplementation(() => {
        return { loginCont: mockLoginContainer };
    });
});

beforeEach(() => {
    mockLoginContainer.mockClear();
});

it('The page should be able to call new() on LoginContainer', () => {
    const loginConsumer = LoginPage(loginProps);
    // Ensure constructor created the object:
    expect(loginConsumer).toBeTruthy();
});

it('We can check if the consumer called the class constructor', () => {
    const loginConsumer = new LoginContainer(loginProps);
    expect(LoginContainer).toHaveBeenCalledTimes(1);
});