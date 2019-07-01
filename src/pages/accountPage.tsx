import * as React from 'react';
import CustomerInfos from '../containers/customerContainer';
import { ICustomerProps } from '../constants/account/IAccount';

/**
 * SelfCare page: displaying customer infos
 */

const AccountPage = (props: ICustomerProps) => (
    <div>
        <CustomerInfos {...props} />
    </div>
);

export default AccountPage;