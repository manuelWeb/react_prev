import * as React from 'react';
import { Component } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextInput from '../components/textInput/textInput';
import Button from '../components/button/button';
import { IAppState } from '../constants/AppInterfaces';
import { AsyncAction } from '../constants/common/typeFactory';
import resetPasswordActions from '../actions/resetPasswordActions';
import IRetourAppelDTO from '../services/interfaces/retourAppelDTO';

interface IProps {
  token: string,
  isPending?: boolean,
  isRequestSuccessfull?: boolean,
  onSubmit: (token: string, password: string, passwordConfirmation: string) => any
}

interface IDefaultProps {
  isPending: boolean,
  isRequestSuccessfull: boolean
}

interface IFormData {
  password: string,
  passwordConfirmation: string
}

interface IState {
  readonly formData: IFormData;
}

export class ResetPassword extends Component<IProps, IState> {
  public static defaultProps: IDefaultProps = {
    isPending: false,
    isRequestSuccessfull: false
  }

  public readonly state: IState = {
    formData: {
      password: '',
      passwordConfirmation: ''
    }
  };

  public render() {
    const passwordId: string = 'password';
    const passwordConfirmationId: string = 'passwordConfirmation';

    return (
      <div>
        <div className="alert alert--info">
          <p>Veuillez indiquer votre nouveau mot de passe. Après Validation, vous pourrez vous connecter à votre compte client.</p>
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="champ">
            <label htmlFor={passwordId} className="label-block champ-obligatoire">
              <span>champ obligatoire</span>Créez votre mot de passe
            </label>
            <TextInput id={passwordId} name={passwordId} value={this.state.formData.password} onChange={this.onValueChange} />
          </div>
          <div className="champ">
            <label htmlFor={passwordConfirmationId} className="label-block champ-obligatoire">
              <span>champ obligatoire</span>Confirmer le mot de passe
            </label>
            <TextInput id={passwordConfirmationId} name={passwordConfirmationId} value={this.state.formData.passwordConfirmation} onChange={this.onValueChange} />
          </div>
          <div className="champ-submit center">
            <Button type="submit" className="nicebutton small green"><span>Je valide</span></Button>
          </div>
        </form>
      </div>
    );
  }

  private onValueChange = (name: string, value: string) => {
    const formData: IFormData = Object.assign({}, this.state.formData);
    formData[name] = value;

    this.setState({ formData });
  }

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onSubmit(this.props.token!, this.state.formData.password, this.state.formData.passwordConfirmation);
  }
}

function mapStateToProps(state: IAppState) {
  return {
    isPending: state.forgotPassword.isPending,
    isRequestSuccessfull: state.forgotPassword.isRequestSuccessfull
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onSubmit: bindActionCreators(submit, dispatch)
  }

  function submit(token: string, password: string, passwordConfirmation: string): AsyncAction<Promise<IRetourAppelDTO>, void, Promise<void>> {
    return resetPasswordActions.reinitPassword(token, password, passwordConfirmation);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);