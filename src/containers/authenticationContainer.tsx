import * as React from 'react';
import { connect } from 'react-redux';
import { ILoginState } from '../constants/authentication/authenticationInterfaces';
import loginActions from '../actions/authenticationActions';
import { bindActionCreators } from 'redux';
import { ILoginCredentialsModel, TokenDataModel } from '../models/authenticationModels';
import { Dispatch } from 'redux';
import IAction from '../constants/common/IAction';
import { History } from 'history';
import { LOGOUT } from '../actions/types/authenticationTypes';
import { AsyncVoidPromiseAction } from '../constants/common/typeFactory';
import { ILoginProps } from '../constants/authentication/authenticationInterfaces';

interface IState {
  username: string;
  password: string;
  submitted: boolean;
}

class LoginContainer extends React.Component<ILoginProps, IState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false
    } as IState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    let result = '';
    if (this.props.isLoading) { result = 'isLoading'; }
    if (this.props.error && this.props.error.length > 0) { result = this.props.error; }

    return (
      <form name="form" onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="email" className="form-control" required={true} name="username" value={this.state.username} onChange={this.handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" required={true} name="password" value={this.state.password} onChange={this.handleChange} />
        <button className="btn btn--success">Login</button>
        <p>{result}</p>
      </form>
    );
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const currentState = { ...this.state };
    this.setState({ ...currentState, [e.target.name]: e.target.value })
  }

  private handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const currentState = { ...this.state };
    this.setState({ ...currentState, submitted: true });
    if (currentState.username && currentState.password) {
      const user: ILoginCredentialsModel = {
        email: this.state.username,
        password: this.state.password
      }
      this.props.login(user, this.props.history);
    }
  }
}

function LogIn(user: ILoginCredentialsModel, history: History): AsyncVoidPromiseAction<Promise<TokenDataModel>, any> {
  return loginActions.login(user, history);
}
function LogOut(): IAction<LOGOUT> {
  return loginActions.logout();
}
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    login: bindActionCreators(LogIn, dispatch),
    logout: bindActionCreators(LogOut, dispatch)
  };
}
function mapStateToProps(state: { login: ILoginState }) {
  return {
    user: state.login.user,
    isLoading: state.login.isLoading,
    error: state.login.error,
    isAuthenticated: state.login.isAuthenticated,
    autoLogin: state.login.autoLogin
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);