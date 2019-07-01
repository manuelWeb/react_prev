import { TokenDataModel, ILoginCredentialsModel } from '../../models/authenticationModels';
import { AsyncVoidPromiseAction } from '../common/typeFactory';
import IAction from '../common/IAction';
import { LOGOUT } from '../../actions/types/authenticationTypes';
import { History } from 'history';

export interface ILoginState {
    readonly user?: TokenDataModel;
    readonly isLoading?: boolean;
    readonly error?: string;
    readonly isAuthenticated: boolean;
    readonly autoLogin: boolean;
}

export interface ILoginProps extends ILoginState {
    history: History;
    logout: () => IAction<LOGOUT>;
    login(user: ILoginCredentialsModel, history: History): AsyncVoidPromiseAction<Promise<TokenDataModel>, any>;
}