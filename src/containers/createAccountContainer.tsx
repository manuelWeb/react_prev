import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { accountActions } from '../actions/accountActions';
import { IAccountState, ICreateAccountProps } from '../constants/account/IAccount';
import { History } from 'history';
import * as React from 'react';
import { CustomerInfoModel, ISubscritptionCustomerModel, IConnectionCustomerModel, IAdressCustomerModel } from '../models/createUpdateCustomerModel';
import { AsyncVoidPromiseAction } from '../constants/common/typeFactory';
import ErrorObject from '../constants/common/errorObject';
import moment from 'moment';
import AddressData from '../components/address/addressData';
import CustomerPersoData from '../components/customer/customerPersoData';
import LoginData from '../components/authentication/login';

class CreateAccountContainer extends React.Component<ICreateAccountProps, IAccountState<CustomerInfoModel>> {
    constructor(props: ICreateAccountProps) {
        super(props)
        this.state = {
            account: {
                AdressCustomer: {} as IAdressCustomerModel,
                SubcriptionCustomer: {} as ISubscritptionCustomerModel,
                ConnexionClient: {} as IConnectionCustomerModel
            } as CustomerInfoModel,
            error: {} as ErrorObject[]
        } as IAccountState<CustomerInfoModel>

        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public render() {
        return (
            <form name="formCreateAcount" onSubmit={this.handleSubmitForm} >
                <h2>Mes identifiants</h2>
                <LoginData loginData={this.props.customerInfo} handleChange={this.handleChange} />
                <h2>Mes coordonnées</h2>
                <CustomerPersoData persoData={this.state.account} handleChange={this.handleChange} />
                <AddressData address={this.state.account.AdressCustomer} handleChange={this.handleChange} />
                <section className="grid-2">
                    <div>
                        <label htmlFor="phone">Téléphone Fixe :</label>
                    </div>
                    <div>
                        <input type="tel" id="phone" name="Phone" maxLength={10} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="cellphone">Téléphone portable :</label>
                    </div>
                    <div>
                        <input type="tel" id="cellphone" name="Cellphone" maxLength={10} onChange={this.handleChange} />
                    </div>
                </section>

                <h2>Votre date d"anniversaire</h2>
                <section className="grid-2">
                    <div>
                        <label htmlFor="birthDate">Date de Naissance :</label>
                    </div>
                    <div>
                        <input type="date" id="birthDate" name="BirthDate" onChange={this.handleChange} />
                    </div>
                </section>

                <h2>Vos abonnements</h2>
                <section className="grid-2">
                    <div>
                        <label htmlFor="optIn">Abonnement</label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" id="optInTrue" name="SubcriptionCustomer.OptIn" value="true"
                                onChange={this.handleChange} checked={this.state.account.SubcriptionCustomer.OptIn === true} /> Oui </label>
                        <label>
                            <input type="radio" id="optInFalse" name="SubcriptionCustomer.OptIn" value="false"
                                onChange={this.handleChange} checked={this.state.account.SubcriptionCustomer.OptIn === false} /> Non </label>
                    </div>
                    <div>
                        <label htmlFor="optIn">Partenaire</label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" id="optInPartenaireTrue" name="SubcriptionCustomer.OptInPartner" value="true"
                                onChange={this.handleChange} checked={this.state.account.SubcriptionCustomer.OptInPartner === true} /> Oui </label>
                        <label>
                            <input type="radio" id="optInPartenaireFalse" name="SubcriptionCustomer.OptInPartner" value="false"
                                onChange={this.handleChange} checked={this.state.account.SubcriptionCustomer.OptInPartner === false} /> Non </label>
                    </div>
                    <div>
                        <label htmlFor="optIn">Sms</label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" id="optInSmsTrue" name="SubcriptionCustomer.OptInSms" value="true"
                                onChange={this.handleChange} checked={this.state.account.SubcriptionCustomer.OptInSms === true} /> Oui </label>
                        <label>
                            <input type="radio" id="optInSmsFalse" name="SubcriptionCustomer.OptInSms" value="false"
                                onChange={this.handleChange} checked={this.state.account.SubcriptionCustomer.OptInSms === false} /> Non </label>
                    </div>
                </section>
                <button>Créer</button>
            </form>
        );
    }

    private handleSubmitForm(event: React.FormEvent) {
        event.preventDefault();

        const currentState = { ...this.state };
        this.setState({ ...currentState });
        const account: CustomerInfoModel = this.state.account as CustomerInfoModel;
        account.DeliveryOffice = account.AdressCustomer.City;
        account.BirthDate = moment(account.BirthDate).format('DD/MM/YYYY');
        const history: History = this.props.history;
        this.props.createAccount(account, history);

    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const currentState = Object.assign({}, this.state);
        const position = event.target.name.indexOf('.');
        if (position !== -1) {
            const first = event.target.name.substr(0, position);
            const second = event.target.name.substr(position + 1, event.target.name.length);
            if (event.target.type === 'radio' && (event.target.value === 'true' || event.target.value === 'false')) {
                currentState.account[first][second] = this.convertToBoolean(event.target.value)
            } else {
                currentState.account[first][second] = event.target.value;
            }
        } else {
            if (event.target.type === 'radio' && (event.target.value === 'true' || event.target.value === 'false')) {
                currentState.account[event.target.name] = this.convertToBoolean(event.target.value)
            } else {
                currentState.account[event.target.name] = event.target.value;
            }
        }
        this.setState(currentState);
    }

    private convertToBoolean(value: string): boolean {
        if (value === 'true') {
            return true;
        } else {
            return false
        }
    }
}

function CreateAccount(account: CustomerInfoModel, propsHistory: History): AsyncVoidPromiseAction<Promise<CustomerInfoModel>, Promise<void>> {

    return accountActions.createAccount(account, propsHistory)
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        createAccount: bindActionCreators(CreateAccount, dispatch),
    };
}

function mapStateToProps(state: { account: IAccountState<CustomerInfoModel> }) {
    return {
        account: state.account
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountContainer)