import * as React from 'react';
import ResetPasswordContainer from '../containers/resetPasswordContainer';
import { RouteComponentProps } from 'react-router-dom';
import 'url-search-params-polyfill';

class ResetPasswordPage extends React.Component<RouteComponentProps> {
  public render() {
    const token: string = this.getToken();

    return (
      <ResetPasswordContainer token={token} />
    )
  }

  private getToken(): string {
    const params = new URLSearchParams(this.props.location.search);
    return params.get('token')!;
  }
}

export default ResetPasswordPage;