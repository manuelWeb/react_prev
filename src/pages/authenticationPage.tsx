import * as React from 'react';
import LoginContainer from '../containers/authenticationContainer'
import { ILoginProps } from '../constants/authentication/authenticationInterfaces';

/**
 * Login page
 */
const LoginPage = (props: ILoginProps) => (
    <div>
        <LoginContainer history={props.history} />
    </div>
);

export default LoginPage;