import * as React from 'react';
import loginActions from '../actions/authenticationActions';
import { accountActions } from '../actions/accountActions';
import { ILoginState } from '../constants/authentication/authenticationInterfaces';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IAccountState } from '../constants/IAccount';
import { ICustomerProps } from '../constants/account/IAccount';
import AddressData from '../components/address/addressData';
import CustomerPersoData from '../components/customer/customerPersoData';
import { CustomerInfoModel } from '../models/createUpdateCustomerModel';
import LoginData from '../components/authentication/login';
import { History } from 'history';

class CustomerContainer extends React.Component<ICustomerProps, {}> {
    constructor(props: ICustomerProps) {
        super(props);

        if (this.props.autoLogin) {
            this.props.getCustomerInfos(this.props.history);
        }
        console.log(props)
    }

    public render() {
        const content = this.conditionalRender(this.props.isAuthenticated);
        return (
            <div>
                <h2>Mes identifiants</h2>
                <LoginData loginData={this.props.customerInfo} />
                <h2>Mes coordonnées</h2>
                {this.props.isAuthenticated &&
                    <CustomerPersoData persoData={this.props.customerInfo} />}
                {this.props.isAuthenticated && this.props.customerInfo.AdressCustomer &&
                    <AddressData address={this.props.customerInfo.AdressCustomer} />}
                <button>Modifier mon adresse</button>
                <section className="grid-2">
                    <div>
                        <label>Téléphone mobile :</label>
                    </div>
                    <div>
                        <label>{this.props.customerInfo.Phone} </label>
                    </div>
                    <div>
                        <label>Téléphone portable :</label>
                    </div>
                    <div>
                        <label>{this.props.customerInfo.Cellphone} </label>
                    </div>
                </section>
                <h2>Ma date d'anniversaire</h2>
                <section className="grid-2">
                    <div>
                        <label>Date de naissance :</label>
                    </div>
                    <div>
                        <label>{this.props.customerInfo.BirthDate} </label>
                    </div>
                </section>
                {content}
            </div>

        )
    }

    private conditionalRender(isAuthenticated: boolean) {
        if (isAuthenticated) {
            return <button className="btn btn--success" onClick={this.props.logout} > logout</button>
        } else {
            return
        }
    }
}

function LogOut() {
    return loginActions.logout();
}
function GetCustomerInfos(propsHistory: History) {
    return accountActions.getCustomerInfo(propsHistory);
}

function mapDispatchToProps(dispatch: any) {
    return {
        logout: bindActionCreators(LogOut, dispatch),
        getCustomerInfos: bindActionCreators(GetCustomerInfos, dispatch)
    };
}
function mapStateToProps(state: { account: IAccountState<CustomerInfoModel>, login: ILoginState }) {
    return {
        customerInfo: state.account.account,
        isAuthenticated: state.login.isAuthenticated,
        autoLogin: state.login.autoLogin
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerContainer);