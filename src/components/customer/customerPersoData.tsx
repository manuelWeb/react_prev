import * as React from 'react';
import { CustomerInfoModel } from '../../models/createUpdateCustomerModel';

class CustomerPersoData extends React.Component<{ persoData: CustomerInfoModel, handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }, {}> {
    private handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    constructor(props: { persoData: CustomerInfoModel, handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
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
                        <label htmlFor="Civility">Civilité :</label>
                    </div>
                    <div>
                        <label><input type="radio" id="civiliteMonsieur" name="Civility" value="MR" onChange={this.handleChange} checked={this.props.persoData.Civility === 'MR'} />Monsieur</label>
                        <label><input type="radio" id="civiliteMadame" name="Civility" value="Mme" onChange={this.handleChange} checked={this.props.persoData.Civility === 'Mme'} />Madame</label>
                    </div>
                    <div>
                        <label htmlFor="nom">Nom :</label>
                    </div>
                    <div>
                        <input type="text" id="nom" name="Name" onChange={this.handleChange} required={true} />
                    </div>
                    <div>
                        <label htmlFor="prenom">Prénom :</label>
                    </div>
                    <div>
                        <input type="text" id="prenom" name="Firstname" onChange={this.handleChange} />
                    </div>
                </section>
            </div>
        } else {
            return <div>
                <section className="grid-2">
                    <div>
                        <label htmlFor="Civility">Civilité :</label>
                    </div>
                    <div>
                        <label>{this.props.persoData.Civility}</label>
                    </div>
                    <div>
                        <label htmlFor="nom">Nom :</label>
                    </div>
                    <div>
                        <label>{this.props.persoData.Name}</label>
                    </div>
                    <div>
                        <label htmlFor="prenom">Prénom :</label>
                    </div>
                    <div>
                        <label>{this.props.persoData.Firstname}</label>
                    </div>
                </section>
            </div>
        }
    }
}

export default CustomerPersoData;