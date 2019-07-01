import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as accessTokenHeader from './../../helpers/accessTokenHeader';
import IRoute from './../../constants/common/route';

export const PrivateRoute = (Component: IRoute, key: number, ...rest: any) => (
    <Route key={key} {...rest} render={props => (
        accessTokenHeader.isAuth(false) ? (<Component.component {...props} />) :
            (<Redirect to={{ pathname: '/Login', state: { from: props.location } }} />)
    )} />
)