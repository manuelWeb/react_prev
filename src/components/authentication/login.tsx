import * as React from 'react';
import { CustomerInfoModel } from '../../models/createUpdateCustomerModel';

class LoginData extends React.Component<{ loginData: CustomerInfoModel, handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }, {}> {
    private handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    constructor(props: { loginData: CustomerInfoModel, handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
        super(props);
        this.handleChange = this.props.handleChange;
    }

    public render(): JSX.Element {
        const content = this.conditionalRender();
        return (
            <div>
                {content}
            </div>
        );
    }

    private conditionalRender(): JSX.Element {
        if (this.handleChange !== undefined) {
            return <div>
                <section className="grid-2">
                    <div>
                        <label htmlFor="emailAdress">Adresse Email :</label>
                    </div>
                    <div>
                        <input type="email" id="emailAdress" name="EmailAdress" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe :</label>
                    </div>
                    <div>
                        <input type="password" id="password" name="ConnexionClient.Password" onChange={this.handleChange} />
                    </div>
                </section>
            </div>
        } else {
            return <div>
                <section className="grid-2">
                    <div>
                        <label>Adresse e-mail:</label>
                    </div>
                    <div>
                        <label>{this.props.loginData.EmailAdress}</label>
                    </div>
                    <div>
                        <label>Mot de passe:</label>
                    </div>
                    <div>
                        <label>{this.props.loginData.EmailAdress}</label>
                    </div>
                </section>
            </div>
        }
    }
}

export default LoginData;