import * as React from 'react';
import { connect } from 'react-redux';
import TextInput from '../components/textInput/textInput';
import Button from '../components/button/button';
import { IAppState } from '../constants/AppInterfaces';
import forgotPasswordActions from '../actions/forgotPasswordActions';
import { bindActionCreators, Dispatch } from 'redux';
import { AsyncAction } from '../constants/common/typeFactory';
import { ForgotPasswordModel } from '../models/forgotPasswordModel';

interface IProps {
  isPending?: boolean,
  isRequestSuccessfull?: boolean,
  onSubmit: (value: any) => any
}

interface IDefaultProps {
  isPending: boolean,
  isRequestSuccessfull: boolean
}

interface IFormData {
  value: string
}

interface IState {
  readonly formData: IFormData;
}

/**
 * Container pour la page ForgotPassword.
 */
class ForgotPassword extends React.Component<IProps, IState> {
  public static defaultProps: IDefaultProps = {
    isPending: false,
    isRequestSuccessfull: false
  }

  public state: IState = {
    formData: {
      value: ''
    }
  }

  public render() {
    if (this.props.isRequestSuccessfull === true) {
      return this.renderSuccessRequest();
    } else {
      return this.renderForm();
    }
  }

  private renderForm() {
    const inputId: string = 'email-or-cid';

    return (
      <form onSubmit={this.onSubmit}>
        <span>Veuillez indiquer votre adresse e-mail ou votre numéro de client(e). Après validation, un mail vous sera envoyé afin de réinitialiser votre mot de passe.</span><br />
        <label htmlFor={inputId}>Adresse e-mail ou numéro de client</label>
        <TextInput id={inputId} name="value" value={this.state.formData.value} onChange={this.onValueChange} />
        <Button type="submit">Je valide</Button>

        {this.props.isPending === true ? (<div>Requête en cours...</div>) : null}
      </form>
    );
  }

  private renderSuccessRequest() {
    return (
      <div>
        Une demande d'initialisation de mot de passe vient de vous être envoyée. <a href="/">Cliquez ici</a> pour revenir à la page d'accueil
        Si vous ne les recevez pas d'ici quelques minutes, merci de nous contacter par téléphone au 0892399399 - 0.45€/min + prix appel pour confirmer votre email.
      </div>
    );
  }

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit(this.state.formData.value);
  }

  private onValueChange = (name: string, value: string) => {
    const formData: IFormData = Object.assign({}, this.state.formData);
    formData[name] = value;

    this.setState({ formData });
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

  function submit(value: string): AsyncAction<Promise<ForgotPasswordModel>, void, Promise<void>> {
    return forgotPasswordActions.requestToken(value);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);