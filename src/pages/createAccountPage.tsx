import * as React from 'react';
import CreateAccountContainer from '../containers/createAccountContainer';
import { ICreateAccountProps } from '../constants/account/IAccount';

/**
 * SelfCare page: displaying customer infos
 */
const CreateAccountPage = (props: ICreateAccountProps) => (
    <div>
        <CreateAccountContainer {...props} />
    </div>
);

export default CreateAccountPage;